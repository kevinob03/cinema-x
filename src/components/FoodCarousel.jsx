import { useEffect, useRef, useState } from 'react'
import { getAddablePromotions } from '../data/promotions.js'
import { formatCurrency } from '../utils/cart.js'
import '../styles/FoodCarousel.css'

const AUTO_INTERVAL = 5000

export default function FoodCarousel() {
  const items = getAddablePromotions()
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return undefined
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [items.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.food-carousel__item')
    if (!card) return
    const cardWidth = card.getBoundingClientRect().width + 24
    track.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }, [index])

  const scrollBy = (direction) => {
    if (items.length === 0) return
    setIndex((current) => (current + direction + items.length) % items.length)
  }

  return (
    <div className="food-carousel">
      <div className="food-carousel__track" ref={trackRef}>
        {items.map((item) => (
          <article key={item.id} className="food-carousel__item">
            <div className="food-carousel__media" aria-hidden="true">
              {/* Estructura preparada: pronto imágenes generadas con Stitch (item.img) */}
              <span className="material-symbols-outlined food-carousel__icon">{item.icon}</span>
            </div>
            <div className="food-carousel__body">
              <h3 className="food-carousel__title">{item.title}</h3>
              <span className="food-carousel__accent">{item.accent}</span>
              <p className="food-carousel__description">{item.description}</p>
            </div>
            <div className="food-carousel__foot">
              <span className="food-carousel__price">{formatCurrency(item.price)}</span>
              <span className="food-carousel__soon">Próximamente</span>
            </div>
          </article>
        ))}
      </div>

      {items.length > 1 && (
        <div className="food-carousel__nav">
          <button
            type="button"
            className="food-carousel__arrow"
            aria-label="Ver anteriores"
            onClick={() => scrollBy(-1)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
          </button>
          <button
            type="button"
            className="food-carousel__arrow"
            aria-label="Ver siguientes"
            onClick={() => scrollBy(1)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
