import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, mapDetail } from '../services/tmdb.js'
import { getScreening, getSeatLayout } from '../data/screenings.js'
import { formatCurrency } from '../utils/cart.js'
import { useCart } from '../context/CartContext.jsx'
import SeatMap from '../components/SeatMap.jsx'
import CineState from '../components/CineState.jsx'
import '../styles/Asientos.css'

export default function Asientos() {
  const { movieId, screeningId } = useParams()
  const navigate = useNavigate()
  const { addTickets } = useCart()

  const [movie, setMovie] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(() => new Set())

  const screening = useMemo(() => getScreening(movieId, screeningId), [movieId, screeningId])
  const layout = useMemo(() => (screening ? getSeatLayout(screening.id) : null), [screening])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getMovieDetails(movieId)
      .then((data) => {
        if (cancelled) return
        setMovie(mapDetail(data))
        setStatus('ready')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [movieId])

  const toggleSeat = (seatId) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(seatId)) {
        next.delete(seatId)
      } else {
        next.add(seatId)
      }
      return next
    })
  }

  const totalValue = selected.size * (screening?.price ?? 0)

  const handleAddToCart = () => {
    if (!movie || !screening || selected.size === 0) return
    addTickets({
      movieId: Number(movieId),
      movieTitle: movie.title,
      screening,
      seats: [...selected],
    })
    navigate('/carrito')
  }

  return (
    <section className="asientos cinema-x-container">
      <Link to={movie ? `/pelicula/${movie.id}` : '/cartelera'} className="asientos__back">
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
        {movie ? movie.title : 'Cartelera'}
      </Link>

      {status === 'loading' && <CineState kind="loading" />}
      {status === 'error' && <CineState kind="error" message={error?.message} />}

      {status === 'ready' && !screening && <CineState kind="empty" />}

      {status === 'ready' && movie && screening && layout && (
        <div className="asientos__content">
          <header className="asientos__header">
            <div className="asientos__header-text">
              <h2 className="asientos__title">{movie.title}</h2>
              <span className="asientos__subtitle">
                {screening.dayLabel} · {screening.time} · {screening.room} ·{' '}
                {formatCurrency(screening.price)} por entrada
              </span>
            </div>
          </header>

          <SeatMap rows={layout} selected={selected} onToggle={toggleSeat} />

          <footer className="asientos__footer">
            <div className="asientos__summary">
              <span className="asientos__count">
                {selected.size} asiento{selected.size === 1 ? '' : 's'} seleccionado
                {selected.size === 1 ? '' : 's'}
              </span>
              <span className="asientos__total">{formatCurrency(totalValue)}</span>
            </div>
            <button
              type="button"
              className="btn-marquee asientos__add"
              disabled={selected.size === 0}
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
          </footer>
        </div>
      )}
    </section>
  )
}