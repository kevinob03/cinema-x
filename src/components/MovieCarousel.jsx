import { Children, useRef } from 'react'
import '../styles/MovieCarousel.css'

export default function MovieCarousel({ children }) {
  const trackRef = useRef(null)

  const scrollByCards = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.movie-carousel__item')
    const amount = card ? card.getBoundingClientRect().width + 24 : 284
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="movie-carousel">
      <div className="movie-carousel__track" ref={trackRef}>
        {Children.map(children, (child, index) => (
          <div className="movie-carousel__item" key={child?.key ?? index}>
            {child}
          </div>
        ))}
      </div>

      <div className="movie-carousel__nav">
        <button
          type="button"
          className="movie-carousel__arrow"
          aria-label="Ver anteriores"
          onClick={() => scrollByCards(-1)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_back
          </span>
        </button>
        <button
          type="button"
          className="movie-carousel__arrow"
          aria-label="Ver siguientes"
          onClick={() => scrollByCards(1)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  )
}