import MovieCard from '../components/MovieCard.jsx'
import CineState from '../components/CineState.jsx'
import useProximamente from '../hooks/useProximamente.js'
import '../styles/Proximamente.css'

export default function Proximamente() {
  const { status, error, movies } = useProximamente()

  return (
    <section className="proximamente cinema-x-container">
      <header className="proximamente__header">
        <h2 className="proximamente__title">Próximamente</h2>
        <div className="proximamente__line" aria-hidden="true" />
        <p className="proximamente__intro">
          Lo que viene en señal: terror y ciencia ficción de inicios de los 90, ya grabados en la cinta.
        </p>
      </header>

      {status === 'loading' && <CineState kind="loading" />}
      {status === 'error' && <CineState kind="error" message={error?.message} />}
      {status === 'ready' && movies.length === 0 && <CineState kind="empty" />}
      {status === 'ready' && movies.length > 0 && (
        <div className="proximamente__grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} flag="Próximamente" to={`/pelicula/${movie.id}`} />
          ))}
        </div>
      )}

      <p className="proximamente__note">
        Años 1990–1995 · Terror &amp; Ciencia Ficción · Fuente: The Movie Database (TMDB)
      </p>
    </section>
  )
}