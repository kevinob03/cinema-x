import { Link } from 'react-router-dom'
import '../styles/MovieCard.css'

export default function MovieCard({
  title,
  tagline,
  year,
  rating,
  genre,
  category,
  accent = 'green',
  poster,
  to,
}) {
  const accentMod = accent === 'purple' ? 'movie-card--purple' : 'movie-card--green'

  const card = (
    <article className={`movie-card ${accentMod}`}>
      <div className="movie-card__accent-bar" aria-hidden="true" />

      <div className="movie-card__poster">
        {poster ? (
          <img className="movie-card__img" src={poster} alt={`Póster de ${title}`} />
        ) : (
          <div className="movie-card__art" role="img" aria-label={`Póster de ${title}`}>
            <span className="movie-card__art-symbol">✦</span>
            <span className="movie-card__art-text">{genre}</span>
          </div>
        )}
        {category && <span className="movie-card__category">{category}</span>}
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        {tagline && <p className="movie-card__tagline">{tagline}</p>}
        <div className="movie-card__chips">
          <span className="chip">{year ?? '—'}</span>
          <span className="chip">{genre ?? '—'}</span>
          {rating != null && <span className="chip">★ {rating}</span>}
        </div>

        {to && (
          <Link to={to} className="movie-card__cta">
            Ficha completa
          </Link>
        )}
      </div>
    </article>
  )

  if (to) {
    return (
      <Link to={to} className="movie-card__link" aria-label={`Ver ficha de ${title}`}>
        {card}
      </Link>
    )
  }

  return card
}