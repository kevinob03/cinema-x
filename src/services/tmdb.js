const API_BASE = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const GENRE_HORROR = 27
export const GENRE_SCI_FI = 878
export const RELEVANT_GENRE_IDS = [GENRE_HORROR, GENRE_SCI_FI, 9648, 53, 14]

export const DECADE_START_YEAR = 1980
export const DECADE_END_YEAR = 1989

const DISCOVER_PAGES = [1, 2, 3, 4]
const DISCOVER_SORT = 'popularity.desc'
const DISCOVER_VOTE_COUNT_GTE = 100
const START_DATE = '1980-01-01'
const END_DATE = '1989-12-31'

const discoverCache = new Map()
let genresRequest = null

function ensureKey() {
  if (!API_KEY) {
    throw new Error('Falta VITE_TMDB_API_KEY en el archivo .env')
  }
}

function buildParams(extra = {}) {
  const params = new URLSearchParams()
  params.set('api_key', API_KEY)
  Object.entries(extra).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value))
    }
  })
  return params.toString()
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

export async function getGenres() {
  ensureKey()
  if (genresRequest) return genresRequest
  genresRequest = (async () => {
    const url = `${API_BASE}/genre/movie/list?${buildParams({ language: 'es-ES' })}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`TMDB genres error ${res.status}`)
    const data = await res.json()
    return data.genres ?? []
  })()
  return genresRequest
}

export async function discoverMovies({ page = 1 } = {}) {
  ensureKey()
  const key = `${page}`
  if (discoverCache.has(key)) return discoverCache.get(key)

  const request = (async () => {
    const url = `${API_BASE}/discover/movie?${buildParams({
      include_adult: 'false',
      language: 'es-ES',
      'primary_release_date.gte': START_DATE,
      'primary_release_date.lte': END_DATE,
      with_genres: `${GENRE_HORROR}|${GENRE_SCI_FI}`,
      sort_by: DISCOVER_SORT,
      'vote_count.gte': String(DISCOVER_VOTE_COUNT_GTE),
      page: String(page),
    })}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`TMDB discover error ${res.status}`)
    const data = await res.json()
    return data
  })()

  discoverCache.set(key, request)
  return request
}

export async function fetchCarteleraRaw() {
  const genres = await getGenres()
  const [movieResponses, genreMap] = await Promise.all([
    Promise.all(DISCOVER_PAGES.map((page) => discoverMovies({ page }))),
    Promise.resolve(Object.fromEntries(genres.map((g) => [g.id, g.name]))),
  ])
  const results = movieResponses.flatMap((res) => res.results ?? [])
  return { results, genreMap, genres }
}

export async function getMovieDetails(id) {
  ensureKey()
  const url = `${API_BASE}/movie/${id}?${buildParams({ language: 'es-ES' })}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB details error ${res.status}`)
  return res.json()
}

function truncate(text, max = 140) {
  if (!text) return ''
  const clean = text.trim().replace(/\s+/g, ' ')
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trimEnd()}…`
}

function parseYear(movie) {
  if (!movie.release_date) return null
  const year = Number(movie.release_date.slice(0, 4))
  return Number.isInteger(year) && year > 0 ? year : null
}

export function isDecadeMovie(movie) {
  return (
    movie.year !== null &&
    movie.year >= DECADE_START_YEAR &&
    movie.year <= DECADE_END_YEAR
  )
}

export function mapMovie(movie, genreMap) {
  const genreIds = movie.genre_ids ?? []
  const primaryGenreId = genreIds[0]
  const primaryGenre = primaryGenreId ? (genreMap[primaryGenreId] ?? null) : null
  const accent = genreIds.includes(GENRE_HORROR) ? 'green' : 'purple'
  const category = accent === 'green' ? 'Terror' : 'Sci-Fi'
  const vote = Number(movie.vote_average ?? 0)

  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview ?? '',
    tagline: truncate(movie.overview),
    year: parseYear(movie),
    releaseDate: movie.release_date,
    genre: primaryGenre,
    category,
    genreIds,
    accent,
    rating: vote > 0 ? vote.toFixed(1) : null,
    voteAverage: vote,
    voteCount: movie.vote_count ?? 0,
    poster: getImageUrl(movie.poster_path, 'w500'),
    backdrop: getImageUrl(movie.backdrop_path, 'w780'),
  }
}

export function mapDetail(movie) {
  const genres = movie.genres ?? []
  const accent = genres.some((g) => g.id === GENRE_HORROR) ? 'green' : 'purple'
  const vote = Number(movie.vote_average ?? 0)

  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview ?? 'Sin sinopsis disponible.',
    tagline: movie.tagline ?? '',
    year: movie.release_date ? Number(movie.release_date.slice(0, 4)) : null,
    releaseDate: movie.release_date,
    genres,
    accent,
    rating: vote > 0 ? vote.toFixed(1) : '—',
    voteCount: movie.vote_count ?? 0,
    runtime: movie.runtime ?? null,
    status: movie.status ?? null,
    originalLanguage: movie.original_language ?? null,
    poster: getImageUrl(movie.poster_path, 'w500'),
    backdrop: getImageUrl(movie.backdrop_path, 'w780'),
  }
}