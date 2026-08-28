import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import CineState from '../components/CineState.jsx'
import QuickBuy from '../components/QuickBuy.jsx'
import MovieCarousel from '../components/MovieCarousel.jsx'
import useCartelera from '../hooks/useCartelera.js'
import '../styles/Inicio.css'

export default function Inicio() {
  const { status, error, movies } = useCartelera()
  const featured = movies[0]
  const weekly = movies.slice(0, 8)
  const carouselMovies = movies.slice(8)
  const heroTheme = featured?.accent === 'green' ? 'Terror VHS' : 'Sci-Fi Noir'

  const fallbackTitle = status === 'loading' ? 'Capturando señal…' : status === 'error' ? 'Sin señal' : 'En espera…'

  return (
    <section className="inicio">
      {/* ---------- Compra Rápida ---------- */}
      <QuickBuy movies={movies} status={status} error={error} />

      {/* ---------- Hero ---------- */}
      <div className="inicio__hero">
        <div className="inicio__hero-bg" aria-hidden="true" />
        <div className="inicio__hero-inner cinema-x-container">
          <div className="inicio__hero-left">
            <span className="inicio__badge">
              <span className="inicio__badge-dot" aria-hidden="true" />
              Now Playing
            </span>

            {featured ? (
              <>
                <h1 className="inicio__title">
                  {featured.title}
                  <br />
                  <span className="inicio__title-accent">{heroTheme}</span>
                </h1>
                <p className="inicio__tagline">{featured.overview}</p>
                <div className="inicio__chips">
                  <span className="chip">{featured.year}</span>
                  <span className="chip">{featured.genre}</span>
                  {featured.rating != null && <span className="chip">★ {featured.rating}</span>}
                </div>
              </>
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

      {/* ---------- Toda la cartelera ---------- */}
      {carouselMovies.length > 0 && (
        <div className="inicio__carousel cinema-x-container">
          <div className="inicio__feature-header">
            <h2 className="inicio__feature-title">Toda la cartelera</h2>
            <div className="inicio__feature-line" aria-hidden="true" />
          </div>
          <MovieCarousel>
            {carouselMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} to={`/pelicula/${movie.id}`} />
            ))}
          </MovieCarousel>
        </div>
      )}
    </section>
  )
}