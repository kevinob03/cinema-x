import { formatCurrency } from '../utils/cart.js'
import '../styles/CartItems.css'

function TicketLine({ line, showRemove, onRemove }) {
  return (
    <li className="cartline cartline--ticket">
      <div className="cartline__main">
        <h4 className="cartline__title">{line.movieTitle}</h4>
        <span className="cartline__meta">
          {line.dayLabel} · {line.time} · {line.room}
        </span>
        <span className="cartline__seats">Asientos: {line.seats.join(', ')}</span>
      </div>
      <div className="cartline__side">
        <span className="cartline__qty">
          {line.quantity} entrada{line.quantity === 1 ? '' : 's'}
        </span>
        <span className="cartline__price">{formatCurrency(line.subtotal)}</span>
        {showRemove && (
          <button
            type="button"
            className="cartline__remove"
            onClick={() => onRemove(line.id)}
            aria-label={`Quitar ${line.movieTitle}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>
    </li>
  )
}

function PromoLine({ line, showRemove, onRemove, onIncrement, onDecrement }) {
  const showStepper = typeof onIncrement === 'function' && typeof onDecrement === 'function'
  return (
    <li className="cartline cartline--promo">
      <div className="cartline__main">
        <h4 className="cartline__title">{line.title}</h4>
        <span className="cartline__meta">Dulcería de Cinema X</span>
      </div>
      <div className="cartline__side">
        {showStepper ? (
          <div className="cartline__stepper">
            <button
              type="button"
              className="cartline__step"
              aria-label={`Disminuir cantidad de ${line.title}`}
              onClick={() => onDecrement(line.id)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                remove
              </span>
            </button>
            <span className="cartline__qty">× {line.quantity}</span>
            <button
              type="button"
              className="cartline__step"
              aria-label={`Aumentar cantidad de ${line.title}`}
              onClick={() => onIncrement(line.id)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add
              </span>
            </button>
          </div>
        ) : (
          <span className="cartline__qty">× {line.quantity}</span>
        )}
        <span className="cartline__price">{formatCurrency(line.subtotal)}</span>
        {showRemove && (
          <button
            type="button"
            className="cartline__remove"
            onClick={() => onRemove(line.id)}
            aria-label={`Quitar ${line.title}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>
    </li>
  )
}

export default function CartItemsList({ items, onRemove, onIncrement, onDecrement }) {
  const showRemove = typeof onRemove === 'function'
  if (items.length === 0) return null
  return (
    <ul className="cartline-list">
      {items.map((line) =>
        line.type === 'ticket' ? (
          <TicketLine key={line.id} line={line} showRemove={showRemove} onRemove={onRemove} />
        ) : (
          <PromoLine
            key={line.id}
            line={line}
            showRemove={showRemove}
            onRemove={onRemove}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ),
      )}
    </ul>
  )
}