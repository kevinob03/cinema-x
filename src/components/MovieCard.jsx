import '../styles/MovieCard.css'

export default function MovieCard({
  title,
  tagline,
  year,
  rating,
  genre,
  category,
  accent = 'green',
  showtimes = [],
  poster,
}) {
  const accentMod = accent === 'purple' ? 'movie-card--purple' : 'movie-card--green'

  return (
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
        <span className="movie-card__category">{category}</span>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__tagline">{tagline}</p>
        <div className="movie-card__chips">
          <span className="chip">{rating}</span>
          <span className="chip">{genre}</span>
          <span className="chip">{year}</span>
        </div>

        {showtimes.length > 0 && (
          <div className="movie-card__showtimes">
            {showtimes.map((slot, i) => {
              const label = typeof slot === 'object' ? slot.label : slot
              const sold = typeof slot === 'object' && slot.soldOut
              return (
                <button
                  key={`${label}-${i}`}
                  type="button"
                  className={`movie-card__time ${sold ? 'movie-card__time--sold' : ''}`}
                  disabled={sold}
                  title={sold ? 'Agotado' : 'Selección de sesión próximamente'}
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}