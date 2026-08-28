import { formatCurrency } from '../utils/cart.js'
import '../styles/Screenings.css'

export default function Screenings({ screenings, onSelect, accent = 'green' }) {
  const purple = accent === 'purple'
  return (
    <div className={`screenings ${purple ? 'screenings--purple' : ''}`}>
      <h3 className="screenings__title">
        <span className="material-symbols-outlined" aria-hidden="true">
          schedule
        </span>
        Funciones
      </h3>
      <ul className="screenings__list">
        {screenings.map((screening) => (
          <li key={screening.id} className="screenings__entry">
            <button
              type="button"
              className={`screenings__item ${purple ? 'screenings__item--purple' : ''}`}
              onClick={() => onSelect(screening)}
            >
              <span className="screenings__time">{screening.time}</span>
              <span className="screenings__day">{screening.dayLabel}</span>
              <span className="screenings__room">{screening.room}</span>
              <span className="screenings__price">{formatCurrency(screening.price)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}