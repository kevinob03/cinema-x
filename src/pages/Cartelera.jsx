import MovieCard from '../components/MovieCard.jsx'
import CineState from '../components/CineState.jsx'
import useCartelera from '../hooks/useCartelera.js'
import { PROMOTIONS } from '../data/promotions.js'
import { formatCurrency } from '../utils/cart.js'
import '../styles/Cartelera.css'

const SORT_OPTIONS = [
  { value: 'vote_desc', label: 'Puntuación ↓' },
  { value: 'vote_asc', label: 'Puntuación ↑' },
  { value: 'year_desc', label: 'Año ↓' },
  { value: 'title_asc', label: 'Título A-Z' },
]

const RATING_OPTIONS = [
  { value: 0, label: 'Todas' },
  { value: 5, label: '5.0+' },
  { value: 6, label: '6.0+' },
  { value: 7, label: '7.0+' },
  { value: 7.5, label: '7.5+' },
]

export default function Cartelera() {
  const { status, error, genres, years, movies, pool, filters, setFilter, resetFilters, isFiltering } =
    useCartelera()

  const topSoon = [...pool].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 3)
  const comboPromo = PROMOTIONS.find((promo) => promo.id === 'combo-mutante')

  return (
    <section className="cartelera cinema-x-container">
      <div className="cartelera__layout">
        {/* ---------- Main content ---------- */}
        <div className="cartelera__main">
          <header className="cartelera__header">
            <h2 className="cartelera__title">Doble Función</h2>
            <div className="cartelera__line" aria-hidden="true" />
          </header>

          <div className="cartelera__toolbar">
            <div className="cartelera__search">
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
              <input
                type="search"
                className="cartelera__search-input"
                placeholder="Buscar título…"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                aria-label="Buscar película por título"
              />
            </div>

            <div className="cartelera__filters">
              <label className="cartelera__field">
                <span className="cartelera__label">Género</span>
                <select
                  className="cartelera__select"
                  value={filters.genreId}
                  onChange={(e) => setFilter('genreId', e.target.value)}
                >
                  <option value="">Todos</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cartelera__field">
                <span className="cartelera__label">Año</span>
                <select
                  className="cartelera__select"
                  value={filters.year}
                  onChange={(e) => setFilter('year', e.target.value)}
                >
                  <option value="">Todos</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cartelera__field">
                <span className="cartelera__label">Puntuación</span>
                <select
                  className="cartelera__select"
                  value={filters.minRating}
                  onChange={(e) => setFilter('minRating', Number(e.target.value))}
                >
                  {RATING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cartelera__field">
                <span className="cartelera__label">Ordenar por</span>
                <select
                  className="cartelera__select"
                  value={filters.sort}
                  onChange={(e) => setFilter('sort', e.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="cartelera__toolbar-foot">
              <span className="cartelera__count">
                {status === 'ready' && `${movies.length} título${movies.length === 1 ? '' : 's'} en transmisión`}
              </span>
              {isFiltering && (
                <button type="button" className="cartelera__clear" onClick={resetFilters}>
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {status === 'loading' && <CineState kind="loading" />}
          {status === 'error' && <CineState kind="error" message={error?.message} />}
          {status === 'ready' && movies.length === 0 && <CineState kind="empty" />}
          {status === 'ready' && movies.length > 0 && (
            <div className="cartelera__grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} to={`/pelicula/${movie.id}`} />
              ))}
            </div>
          )}
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="cartelera__sidebar">
          <div className="cartelera__module">
            <h3 className="cartelera__module-title">
              <span className="material-symbols-outlined" aria-hidden="true">
                visibility
              </span>
              Top Rated
            </h3>
            <ul className="cartelera__soon">
              {topSoon.map((item) => (
                <li key={item.id} className="cartelera__soon-item">
                  <div className="cartelera__soon-thumb" aria-hidden="true">
                    {item.poster ? (
                      <img className="cartelera__soon-img" src={item.poster} alt="" />
                    ) : (
                      <span className="material-symbols-outlined">static</span>
                    )}
                  </div>
                  <div className="cartelera__soon-info">
                    <h4 className="cartelera__soon-title">{item.title}</h4>
                    <span className="cartelera__soon-date">
                      {item.year} · ★ {item.rating}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="cartelera__promo">
            <span className="material-symbols-outlined" aria-hidden="true">
              {comboPromo.icon}
            </span>
            <h3 className="cartelera__promo-title">
              {comboPromo.title}
              <br />
              <span className="cartelera__promo-accent">{comboPromo.accent}</span>
            </h3>
            <p className="cartelera__promo-text">{comboPromo.description}</p>
            <div className="cartelera__promo-price" aria-hidden="true">
              {formatCurrency(comboPromo.price)}
            </div>
          </div>
        </aside>
      </div>

      <p className="cartelera__note">
        Cartelera 1980–1989 · Terror &amp; Ciencia Ficción · Fuente: The Movie Database (TMDB)
      </p>
    </section>
  )
}