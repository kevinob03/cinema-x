import MovieCard from '../components/MovieCard.jsx'
import { sampleMovies, comingSoon } from '../data/sampleMovies.js'
import '../styles/Cartelera.css'

export default function Cartelera() {
  return (
    <section className="cartelera cinema-x-container">
      <div className="cartelera__layout">
        {/* ---------- Main content ---------- */}
        <div className="cartelera__main">
          <header className="cartelera__header">
            <h2 className="cartelera__title">Doble Función</h2>
            <div className="cartelera__line" aria-hidden="true" />
          </header>

          <div className="cartelera__grid">
            {sampleMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="cartelera__sidebar">
          <div className="cartelera__module">
            <h3 className="cartelera__module-title">
              <span className="material-symbols-outlined" aria-hidden="true">
                visibility
              </span>
              Transmitting Soon
            </h3>
            <ul className="cartelera__soon">
              {comingSoon.map((item) => (
                <li key={item.title} className="cartelera__soon-item">
                  <div
                    className="cartelera__soon-thumb"
                    role="img"
                    aria-label={`Póster de ${item.title}`}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      static
                    </span>
                  </div>
                  <div className="cartelera__soon-info">
                    <h4 className="cartelera__soon-title">{item.title}</h4>
                    <span className="cartelera__soon-date">{item.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="cartelera__promo">
            <span className="material-symbols-outlined" aria-hidden="true">
              local_pizza
            </span>
            <h3 className="cartelera__promo-title">
              El Combo Mutante
              <br />
              <span className="cartelera__promo-accent">de Palomitas</span>
            </h3>
            <p className="cartelera__promo-text">Palomitas radiactivas grandes &amp; 2 sodas tóxicas.</p>
            <div className="cartelera__promo-price" aria-hidden="true">
              $19.84
            </div>
          </div>
        </aside>
      </div>

      <p className="cartelera__note">Programa de muestra · La cartelera oficial se conectará próximamente</p>
    </section>
  )
}