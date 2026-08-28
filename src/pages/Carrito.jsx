import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/cart.js'
import CartItemsList from '../components/CartItemsList.jsx'
import CineState from '../components/CineState.jsx'
import '../styles/Carrito.css'

export default function Carrito() {
  const { items, itemsCount, subtotal, removeItem, incrementPromo, decrementPromo } = useCart()
  const navigate = useNavigate()

  return (
    <section className="carrito cinema-x-container">
      <header className="carrito__header">
        <h2 className="carrito__title">Tu Carrito</h2>
        <div className="carrito__line" aria-hidden="true" />
      </header>

      {items.length === 0 ? (
        <CineState kind="empty" message="Todavía no hay entradas en transmisión." />
      ) : (
        <>
          <CartItemsList
            items={items}
            onRemove={removeItem}
            onIncrement={incrementPromo}
            onDecrement={decrementPromo}
          />
          <div className="carrito__totals">
            <span className="carrito__totals-label">
              Subtotal ({itemsCount} artículo{itemsCount === 1 ? '' : 's'})
            </span>
            <span className="carrito__totals-value">{formatCurrency(subtotal)}</span>
          </div>
        </>
      )}

      <div className="carrito__promos-link">
        <Link to="/promociones" className="carrito__promos-link-btn">
          Ver promociones de Cinema X →
        </Link>
      </div>

      <div className="carrito__actions">
        <Link to="/cartelera" className="carrito__back-link">
          Seguir eligiendo películas
        </Link>
        <button
          type="button"
          className="btn-marquee"
          disabled={items.length === 0}
          onClick={() => navigate('/resumen')}
        >
          Proceder al resumen
        </button>
      </div>
    </section>
  )
}