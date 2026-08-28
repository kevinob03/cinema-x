export function isFavorite(favorites, movieId) {
  return favorites.some((movie) => Number(movie.id) === Number(movieId))
}

export function toggleFavorite(favorites, movie) {
  if (isFavorite(favorites, movie.id)) {
    return favorites.filter((item) => Number(item.id) !== Number(movie.id))
  }
  return [movie, ...favorites]
}

export function buildCardFromDetail(detail) {
  const genres = detail.genres ?? []
  const primaryGenre = genres[0]?.name ?? null
  const rating = detail.rating != null && detail.rating !== '—' ? detail.rating : null
  const category = detail.accent === 'green' ? 'Terror' : 'Sci-Fi'

  return {
    id: detail.id,
    title: detail.title,
    originalTitle: detail.originalTitle,
    tagline: detail.tagline || detail.overview,
    year: detail.year,
    releaseDate: detail.releaseDate,
    genre: primaryGenre,
    category,
    accent: detail.accent ?? 'green',
    rating,
    poster: detail.poster,
    backdrop: detail.backdrop,
  }
}