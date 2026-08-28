import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import CineState from '../components/CineState.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import '../styles/Favoritos.css'

export default function Favoritos() {
  const { favorites } = useFavorites()

  return (
    <section className="favoritos cinema-x-container">
      <header className="favoritos__header">
        <h2 className="favoritos__title">Mis Películas</h2>
        <div className="favoritos__line" aria-hidden="true" />
      </header>

      {favorites.length === 0 ? (
        <div className="favoritos__empty">
          <CineState kind="empty" message="Todavía no has marcado ninguna película como favorita." />
          <Link to="/cartelera" className="favoritos__empty-link">
            Ir a la cartelera →
          </Link>
        </div>
      ) : (
        <div className="favoritos__grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} {...movie} to={`/pelicula/${movie.id}`} />
          ))}
        </div>
      )}
    </section>
  )
}