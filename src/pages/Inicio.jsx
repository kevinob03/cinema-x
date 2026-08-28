import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import { featured, sampleMovies } from '../data/sampleMovies.js'
import '../styles/Inicio.css'

const previewMovies = sampleMovies.slice(0, 2)

export default function Inicio() {
  return (
    <section className="inicio">
      {/* ---------- Hero ---------- */}
      <div className="inicio__hero">
        <div className="inicio__hero-bg" aria-hidden="true" />
        <div className="inicio__hero-inner cinema-x-container">
          <div className="inicio__hero-left">
            <span className="inicio__badge">
              <span className="inicio__badge-dot" aria-hidden="true" />
              Now Playing
            </span>
            <h1 className="inicio__title">
              {featured.titleLine1}
              <br />
              <span className="inicio__title-accent">{featured.titleLine2}</span>
            </h1>
            <p className="inicio__tagline">{featured.tagline}</p>
            <div className="inicio__chips">
              {featured.chips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="inicio__hero-right">
            <div className="inicio__next-screen">
              <span className="inicio__next-label">Próxima Función</span>
              <span className="inicio__next-time">{featured.nextScreening}</span>
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

      {/* ---------- Double Feature ---------- */}
      <div className="inicio__feature cinema-x-container">
        <div className="inicio__feature-header">
          <h2 className="inicio__feature-title">Doble Función</h2>
          <div className="inicio__feature-line" aria-hidden="true" />
        </div>

        <div className="inicio__feature-grid">
          {previewMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        <div className="inicio__more">
          <Link to="/cartelera" className="inicio__more-link">
            Ver toda la cartelera →
          </Link>
        </div>
      </div>
    </section>
  )
}