export const TICKET_PRICE = 3800

export const SCREENING_TIMES = ['17:30', '19:45', '20:15', '22:30', '23:59', '00:15', '02:00']

export const SCREENING_ROOMS = ['SALA 1', 'SALA 2', 'SALA 3']

export const DAY_LABELS = ['Esta noche', 'Mañana', 'Pasado mañana']

export const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const SEATS_PER_ROW = 10

const OCCUPIED_RATIO = 0.25

function hashString(str) {
  let hash = 2166136261
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function getScreeningsForMovie(movieId) {
  const seed = hashString(`movie-${movieId}`)
  const screeningCount = 2 + (seed % 2)
  const timeStep = 1 + (seed % 3)
  const roomOffset = seed % SCREENING_ROOMS.length

  return Array.from({ length: screeningCount }, (_, index) => {
    const time = SCREENING_TIMES[(seed + index * timeStep) % SCREENING_TIMES.length]
    const room = SCREENING_ROOMS[(roomOffset + index) % SCREENING_ROOMS.length]
    const dayLabel = DAY_LABELS[index % DAY_LABELS.length]
    const id = `m${movieId}-${index}-${time}-${room}`.replace(/\s+/g, '-')
    return { id, movieId, dayLabel, time, room, price: TICKET_PRICE }
  })
}

export function getScreening(movieId, screeningId) {
  return getScreeningsForMovie(movieId).find((screening) => screening.id === screeningId) ?? null
}

export function getSeatLayout(screeningId) {
  const totalSeats = SEAT_ROWS.length * SEATS_PER_ROW
  const rng = mulberry32(hashString(`salon-${screeningId}`))
  const occupiedCount = Math.round(totalSeats * OCCUPIED_RATIO)

  const occupied = new Set()
  while (occupied.size < occupiedCount) {
    occupied.add(Math.floor(rng() * totalSeats))
  }

  return SEAT_ROWS.map((rowName, rowIndex) => ({
    name: rowName,
    seats: Array.from({ length: SEATS_PER_ROW }, (_, colIndex) => {
      const seatIndex = rowIndex * SEATS_PER_ROW + colIndex
      return {
        id: `${rowName}${colIndex + 1}`,
        status: occupied.has(seatIndex) ? 'occupied' : 'free',
      }
    }),
  }))
}