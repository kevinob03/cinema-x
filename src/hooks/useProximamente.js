import { useEffect, useState } from 'react'
import { fetchUpcomingRaw, mapMovie } from '../services/tmdb.js'

export default function useProximamente() {
  const [state, setState] = useState({ status: 'loading', movies: [], error: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { results, genreMap } = await fetchUpcomingRaw()
        if (cancelled) return
        const movies = results
          .map((movie) => mapMovie(movie, genreMap))
          .sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
        setState({ status: 'ready', movies, error: null })
      } catch (error) {
        if (cancelled) return
        setState({ status: 'error', movies: [], error })
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}