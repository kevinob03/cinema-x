import '../styles/CineState.css'

const COPY = {
  loading: {
    icon: 'static',
    title: 'Capturando Señal',
    text: 'La cartelera se está descargando desde TMDB…',
  },
  empty: {
    icon: 'search_off',
    title: 'Señal Perdida',
    text: 'Sin resultados en esta transmisión. Ajusta la búsqueda.',
  },
  error: {
    icon: 'report_problem',
    title: 'Error de Transmisión',
    text: 'No se pudo contactar a TMDB. Revisa VITE_TMDB_API_KEY en el archivo .env.',
  },
}

export default function CineState({ kind = 'loading', message }) {
  const copy = COPY[kind] ?? COPY.loading

  return (
    <div className={`cine-state cine-state--${kind}`} role="status">
      <span className="material-symbols-outlined cine-state__icon" aria-hidden="true">
        {copy.icon}
      </span>
      <h3 className="cine-state__title">{copy.title}</h3>
      <p className="cine-state__text">{message ?? copy.text}</p>
    </div>
  )
}