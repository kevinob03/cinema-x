import { useEffect, useMemo, useState } from 'react'
import { fetchCarteleraRaw, isDecadeMovie, mapMovie, RELEVANT_GENRE_IDS } from '../services/tmdb.js'

const SORTERS = {
  vote_desc: (a, b) => b.voteAverage - a.voteAverage,
  vote_asc: (a, b) => a.voteAverage - b.voteAverage,
  year_desc: (a, b) => (b.year ?? 0) - (a.year ?? 0),
  title_asc: (a, b) => a.title.localeCompare(b.title),
}

export default function useCartelera() {
  const [state, setState] = useState({ status: 'loading', pool: [], genres: [], error: null })
  const [filters, setFilters] = useState({
    search: '',
    genreId: '',
    year: '',
    minRating: 0,
    sort: 'vote_desc',
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { results, genres, genreMap } = await fetchCarteleraRaw()
        if (cancelled) return
        const pool = results.map((movie) => mapMovie(movie, genreMap)).filter(isDecadeMovie)
        setState({ status: 'ready', pool, genres, error: null })
      } catch (error) {
        if (cancelled) return
        setState({ status: 'error', pool: [], genres: [], error })
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const genresOptions = useMemo(
    () => state.genres.filter((genre) => RELEVANT_GENRE_IDS.includes(genre.id)),
    [state.genres],
  )

  const yearsOptions = useMemo(() => {
    const years = Array.from(new Set(state.pool.map((m) => m.year).filter(Boolean)))
    return years.sort((a, b) => b - a)
  }, [state.pool])

  const movies = useMemo(() => {
    const { search, genreId, year, minRating, sort } = filters
    const query = search.trim().toLowerCase()
    const genreNumber = genreId ? Number(genreId) : null

    const filtered = state.pool.filter((movie) => {
      if (query && !movie.title.toLowerCase().includes(query) && !movie.originalTitle?.toLowerCase().includes(query)) {
        return false
      }
      if (genreNumber && !movie.genreIds.includes(genreNumber)) return false
      if (year && movie.year !== Number(year)) return false
      if (minRating > 0 && movie.voteAverage < minRating) return false
      return true
    })

    return [...filtered].sort(SORTERS[sort] ?? SORTERS.vote_desc)
  }, [state.pool, filters])

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({ search: '', genreId: '', year: '', minRating: 0, sort: 'vote_desc' })
  }

  const isFiltering =
    filters.search.trim() !== '' || filters.genreId !== '' || filters.year !== '' || filters.minRating > 0

  return {
    status: state.status,
    error: state.error,
    genres: genresOptions,
    years: yearsOptions,
    movies,
    pool: state.pool,
    filters,
    setFilter,
    resetFilters,
    isFiltering,
  }
}