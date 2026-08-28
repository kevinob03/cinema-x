import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, mapDetail } from '../services/tmdb.js'
import { getScreeningsForMovie } from '../data/screenings.js'
import Screenings from '../components/Screenings.jsx'
import CineState from '../components/CineState.jsx'
import '../styles/Pelicula.css'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Pelicula() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const screenings = useMemo(() => getScreeningsForMovie(id), [id])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getMovieDetails(id)
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
  }, [id])

  return (
    <section className="pelicula">
      {status === 'loading' && (
        <div className="pelicula__container cinema-x-container">
          <CineState kind="loading" />
        </div>
      )}

      {status === 'error' && (
        <div className="pelicula__container cinema-x-container">
          <CineState kind="error" message={error?.message} />
        </div>
      )}

      {status === 'ready' && movie && (
        <div className="pelicula__container cinema-x-container">
          <Link to="/cartelera" className="pelicula__back">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Volver a la cartelera
          </Link>

          <div className="pelicula__grid">
            <div className="pelicula__poster-wrap">
              {movie.poster ? (
                <img className="pelicula__poster" src={movie.poster} alt={`Póster de ${movie.title}`} />
              ) : (
                <div className="pelicula__poster pelicula__poster--art" role="img" aria-label={`Póster de ${movie.title}`}>
                  <span className="pelicula__art-symbol">✦</span>
                </div>
              )}
            </div>

            <div className="pelicula__info">
              <span className="pelicula__kicker">
                {movie.accent === 'green' ? 'Terror en VHS' : 'Ciencia Ficción Nocturna'} · Función de medianoche
              </span>

              <h1 className="pelicula__title">{movie.title}</h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <span className="pelicula__original">{movie.originalTitle}</span>
              )}

              {movie.tagline && <p className="pelicula__tagline">{movie.tagline}</p>}

              <div className="pelicula__meta">
                {movie.year && <span className="chip">{movie.year}</span>}
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="chip">
                    {genre.name}
                  </span>
                ))}
                {movie.runtime && <span className="chip">{movie.runtime} min</span>}
                <span className="pelicula__score" title={`Votos: ${movie.voteCount}`}>
                  ★ {movie.rating}
                </span>
              </div>

              <p className="pelicula__overview">{movie.overview}</p>

              <hr className="pelicula__rule" />

              <dl className="pelicula__list">
                <div className="pelicula__row">
                  <dt>Fecha de estreno</dt>
                  <dd>{formatDate(movie.releaseDate)}</dd>
                </div>
                <div className="pelicula__row">
                  <dt>Duración</dt>
                  <dd>{movie.runtime ? `${movie.runtime} minutos` : '—'}</dd>
                </div>
                <div className="pelicula__row">
                  <dt>Idioma original</dt>
                  <dd>{movie.originalLanguage ? movie.originalLanguage.toUpperCase() : '—'}</dd>
                </div>
                <div className="pelicula__row">
                  <dt>Estado</dt>
                  <dd>{movie.status ?? '—'}</dd>
                </div>
                <div className="pelicula__row">
                  <dt>Votos</dt>
                  <dd>{movie.voteCount}</dd>
                </div>
              </dl>

              <div className="pelicula__screenings">
                <Screenings
                  screenings={screenings}
                  accent={movie.accent}
                  onSelect={(screening) => navigate(`/asientos/${movie.id}/${screening.id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}