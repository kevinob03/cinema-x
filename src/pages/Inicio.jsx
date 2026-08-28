import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import CineState from '../components/CineState.jsx'
import QuickBuy from '../components/QuickBuy.jsx'
import FoodCarousel from '../components/FoodCarousel.jsx'
import useCartelera from '../hooks/useCartelera.js'
import '../styles/Inicio.css'

const HERO_COUNT = 5
const HERO_INTERVAL = 6000

export default function Inicio() {
  const { status, error, movies } = useCartelera()
  const weekly = movies.slice(0, 8)
  const heroMovies = movies.slice(0, HERO_COUNT)
  const [heroIndex, setHeroIndex] = useState(0)
  const timerRef = useRef(null)
  const slide = heroMovies[heroIndex]

  useEffect(() => {
    if (heroMovies.length < 2) return undefined
    const start = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setHeroIndex((current) => (current + 1) % heroMovies.length)
      }, HERO_INTERVAL)
    }
    start()
    return () => clearInterval(timerRef.current)
  }, [heroMovies.length])

  const goToSlide = (index) => {
    setHeroIndex(((index % heroMovies.length) + heroMovies.length) % heroMovies.length)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setHeroIndex((current) => (current + 1) % heroMovies.length)
      }, HERO_INTERVAL)
    }
  }

  const heroBackdrop = slide?.backdrop || slide?.poster
  const fallbackTitle =
    status === 'loading' ? 'Capturando señal…' : status === 'error' ? 'Sin señal' : 'En espera…'

  return (
    <section className="inicio">
      {/* ---------- Compra Rápida ---------- */}
      <QuickBuy movies={movies} status={status} error={error} />

      {/* ---------- Hero ---------- */}
      <div className="inicio__hero">
        <div className="inicio__hero-bg" aria-hidden="true" />
        {heroBackdrop && (
          <div
            className="inicio__hero-bg-img"
            style={{ backgroundImage: `url('${heroBackdrop}')` }}
            aria-hidden="true"
          />
        )}
        <div className="inicio__hero-inner cinema-x-container">
          <div className="inicio__hero-left">
            <span className="inicio__badge" key={`badge-${slide?.id ?? 'empty'}-${heroIndex}`}>
              <span className="inicio__badge-dot" aria-hidden="true" />
              Now Playing
            </span>

            {slide ? (
              <h1 className="inicio__title" key={`title-${slide.id}`}>
                {slide.title}
              </h1>
            ) : (
              <h1 className="inicio__title">
                Cinema X
                <br />
                <span className="inicio__title-accent">{fallbackTitle}</span>
              </h1>
            )}
          </div>

          <div className="inicio__hero-right">
            <div className="inicio__next-screen">
              <span className="inicio__next-label">Próxima Función</span>
              <span className="inicio__next-time">23:59</span>
            </div>
            <Link to="/cartelera" className="btn-marquee">
              Ver Cartelera
              <span className="material-symbols-outlined" aria-hidden="true">
                local_activity
              </span>
            </Link>
          </div>
        </div>

        {heroMovies.length > 1 && (
          <>
            <button
              type="button"
              className="inicio__hero-arrow inicio__hero-arrow--prev"
              aria-label="Película anterior"
              onClick={() => goToSlide(heroIndex - 1)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_back
              </span>
            </button>
            <button
              type="button"
              className="inicio__hero-arrow inicio__hero-arrow--next"
              aria-label="Siguiente película"
              onClick={() => goToSlide(heroIndex + 1)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </button>

            <div className="inicio__hero-dots" role="tablist" aria-label="Películas destacadas">
              {heroMovies.map((movie, index) => (
                <button
                  key={movie.id}
                  type="button"
                  role="tab"
                  aria-selected={index === heroIndex}
                  aria-label={`Ver ${movie.title}`}
                  className={`inicio__hero-dot ${index === heroIndex ? 'inicio__hero-dot--active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ---------- Cartelera Semanal ---------- */}
      <div className="inicio__feature cinema-x-container">
        <div className="inicio__feature-header">
          <h2 className="inicio__feature-title">Cartelera Semanal</h2>
          <div className="inicio__feature-line" aria-hidden="true" />
        </div>

        {status === 'loading' && <CineState kind="loading" />}
        {status === 'error' && <CineState kind="error" message={error?.message} />}
        {status === 'ready' && weekly.length === 0 && <CineState kind="empty" />}

        {weekly.length > 0 && (
          <div className="inicio__weekly-grid">
            {weekly.map((movie) => (
              <MovieCard key={movie.id} {...movie} to={`/pelicula/${movie.id}`} />
            ))}
          </div>
        )}

        <div className="inicio__more">
          <Link to="/cartelera" className="inicio__more-link">
            Ver toda la cartelera →
          </Link>
        </div>
      </div>

      {/* ---------- Comida y Combos ---------- */}
      <div className="inicio__food cinema-x-container">
        <div className="inicio__feature-header">
          <h2 className="inicio__feature-title">Comida y Combos</h2>
          <div className="inicio__feature-line" aria-hidden="true" />
        </div>
        <FoodCarousel />
      </div>
    </section>
  )
}
