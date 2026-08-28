import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DAY_LABELS, getScreeningsForMovie } from '../data/screenings.js'
import { formatCurrency } from '../utils/cart.js'
import '../styles/QuickBuy.css'

export default function QuickBuy({ movies = [], status = 'ready', error = null }) {
  const navigate = useNavigate()
  const [movieId, setMovieId] = useState('')
  const [dayIndex, setDayIndex] = useState(0)
  const [screeningId, setScreeningId] = useState('')

  useEffect(() => {
    if (status === 'ready' && movies.length > 0) {
      setMovieId((current) => current || String(movies[0].id))
    }
  }, [status, movies])

  const dailyScreenings = useMemo(() => {
    if (!movieId) return []
    const dayLabel = DAY_LABELS[dayIndex]
    return getScreeningsForMovie(movieId).filter((screening) => screening.dayLabel === dayLabel)
  }, [movieId, dayIndex])

  useEffect(() => {
    if (dailyScreenings.length > 0) {
      setScreeningId((current) =>
        dailyScreenings.some((screening) => screening.id === current) ? current : dailyScreenings[0].id,
      )
    } else {
      setScreeningId('')
    }
  }, [dailyScreenings])

  const selectedScreening = dailyScreenings.find((screening) => screening.id === screeningId) ?? null

  const handleBuy = () => {
    if (!movieId || !selectedScreening) return
    navigate(`/asientos/${movieId}/${selectedScreening.id}`)
  }

  return (
    <aside className="quickbuy cinema-x-container">
      <div className="quickbuy__panel">
        <header className="quickbuy__head">
          <span className="quickbuy__icon material-symbols-outlined" aria-hidden="true">
            confirmation_number
          </span>
          <div>
            <h2 className="quickbuy__title">Compra Rápida</h2>
            <span className="quickbuy__subtitle">Elige película, día y horario</span>
          </div>
        </header>

        <div className="quickbuy__fields">
          <label className="quickbuy__field">
            <span className="quickbuy__label">Película</span>
            <select
              className="quickbuy__select"
              value={movieId}
              onChange={(event) => setMovieId(event.target.value)}
              disabled={status !== 'ready' || movies.length === 0}
            >
              <option value="">Selecciona…</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} ({movie.year})
                </option>
              ))}
            </select>
          </label>

          <label className="quickbuy__field">
            <span className="quickbuy__label">Día</span>
            <select
              className="quickbuy__select"
              value={dayIndex}
              onChange={(event) => setDayIndex(Number(event.target.value))}
            >
              {DAY_LABELS.map((label, index) => (
                <option key={label} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="quickbuy__field">
            <span className="quickbuy__label">Horario</span>
            <select
              className="quickbuy__select"
              value={screeningId}
              onChange={(event) => setScreeningId(event.target.value)}
              disabled={dailyScreenings.length === 0}
            >
              {dailyScreenings.length === 0 ? (
                <option value="">Sin función</option>
              ) : (
                dailyScreenings.map((screening) => (
                  <option key={screening.id} value={screening.id}>
                    {screening.time}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <footer className="quickbuy__foot">
          <div className="quickbuy__meta">
            {selectedScreening ? (
              <>
                <span className="quickbuy__room">{selectedScreening.room}</span>
                <span className="quickbuy__price">{formatCurrency(selectedScreening.price)}</span>
                <span className="quickbuy__note">por entrada</span>
              </>
            ) : (
              <span className="quickbuy__note">Selecciona una función para comprar</span>
            )}
          </div>
          <button
            type="button"
            className="btn-marquee quickbuy__buy"
            disabled={!selectedScreening}
            onClick={handleBuy}
          >
            Comprar
            <span className="material-symbols-outlined" aria-hidden="true">
              local_activity
            </span>
          </button>
        </footer>
      </div>
    </aside>
  )
}