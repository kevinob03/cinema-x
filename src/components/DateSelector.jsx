import { useEffect, useMemo, useRef } from 'react'
import '../styles/DateSelector.css'

function buildDays(count = 7) {
  const days = []
  const today = new Date()
  for (let index = 0; index < count; index += 1) {
    const date = new Date(today)
    date.setDate(today.getDate() + index)
    days.push({
      iso: date.toISOString().slice(0, 10),
      dayNumber: String(date.getDate()).padStart(2, '0'),
      weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      isToday: index === 0,
    })
  }
  return days
}

export default function DateSelector({ selectedDate, onSelect }) {
  const days = useMemo(() => buildDays(7), [])
  const trackRef = useRef(null)

  useEffect(() => {
    if (!selectedDate) return
    const track = trackRef.current
    if (!track) return
    const active = track.querySelector('.date-selector__day--active')
    if (!active) return
    const container = active.closest('.date-selector__track')
    if (!container) return
    container.scrollTo({
      left: active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [selectedDate])

  const moveBy = (direction) => {
    const currentIndex = days.findIndex((day) => day.iso === selectedDate)
    if (currentIndex === -1) return
    const next = Math.min(Math.max(currentIndex + direction, 0), days.length - 1)
    onSelect(days[next].iso)
  }

  return (
    <div className="date-selector">
      <button
        type="button"
        className="date-selector__arrow"
        aria-label="Ver fecha anterior"
        onClick={() => moveBy(-1)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
      </button>

      <div className="date-selector__track" ref={trackRef} role="tablist" aria-label="Fechas de cartelera">
        {days.map((day) => {
          const active = day.iso === selectedDate
          return (
            <button
              key={day.iso}
              type="button"
              role="tab"
              aria-selected={active}
              className={`date-selector__day ${active ? 'date-selector__day--active' : ''}`}
              onClick={() => onSelect(day.iso)}
            >
              <span className="date-selector__weekday">{day.weekday}</span>
              <span className="date-selector__number">{day.dayNumber}</span>
              {day.isToday && <span className="date-selector__today">Hoy</span>}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className="date-selector__arrow"
        aria-label="Ver fecha siguiente"
        onClick={() => moveBy(1)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_forward
        </span>
      </button>
    </div>
  )
}
