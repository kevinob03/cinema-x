import { useEffect, useState } from 'react'
import { getMovieDetails, mapDetail } from '../services/tmdb.js'

export default function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setMovie(null)
    setError(null)

    getMovieDetails(movieId)
      .then((data) => {
        if (cancelled) return
        setMovie(mapDetail(data))
        setStatus('ready')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [movieId])

  return { movie, status, error }
}