import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import '../styles/MovieCard.css'

export default function MovieCard({
  id,
  title,
  originalTitle,
  tagline,
  year,
  rating,
  genre,
  category,
  accent = 'green',
  poster,
  to,
  flag,
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const accentMod = accent === 'purple' ? 'movie-card--purple' : 'movie-card--green'
  const favorite = isFavorite(id)

  const favMovie = {
    id,
    title,
    originalTitle,
    tagline,
    year,
    rating,
    genre,
    category,
    accent,
    poster,
  }

  const posterBlock = (
    <div className="movie-card__poster">
      {poster ? (
        <img className="movie-card__img" src={poster} alt={`Póster de ${title}`} />
      ) : (
        <div className="movie-card__art" role="img" aria-label={`Póster de ${title}`}>
          <span className="movie-card__art-symbol">✦</span>
          <span className="movie-card__art-text">{genre}</span>
        </div>
      )}
      {flag && <span className="movie-card__flag">{flag}</span>}
      {category && <span className="movie-card__category">{category}</span>}
    </div>
  )

  const bodyBlock = (
    <div className="movie-card__body">
      <h3 className="movie-card__title">{title}</h3>
      {tagline && <p className="movie-card__tagline">{tagline}</p>}
      <div className="movie-card__chips">
        <span className="chip">{year ?? '—'}</span>
        <span className="chip">{genre ?? '—'}</span>
        {rating != null && <span className="chip">★ {rating}</span>}
      </div>

      {to && (
        <span className="movie-card__cta">Ficha completa</span>
      )}
    </div>
  )

  return (
    <article className={`movie-card ${accentMod}`}>
      <div className="movie-card__accent-bar" aria-hidden="true" />
      {to ? (
        <Link to={to} className="movie-card__link" aria-label={`Ver ficha de ${title}`}>
          {posterBlock}
          {bodyBlock}
        </Link>
      ) : (
        <>
          {posterBlock}
          {bodyBlock}
        </>
      )}
      <button
        type="button"
        className={`movie-card__fav ${favorite ? 'movie-card__fav--on' : ''}`}
        aria-pressed={favorite}
        aria-label={favorite ? `Quitar ${title} de favoritos` : `Agregar ${title} a favoritos`}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          toggleFavorite(favMovie)
        }}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {favorite ? 'favorite' : 'favorite_border'}
        </span>
      </button>
    </article>
  )
}