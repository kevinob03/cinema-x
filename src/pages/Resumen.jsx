import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { buildOrderNumber, formatCurrency } from '../utils/cart.js'
import { buildOrderRecord, saveOrder } from '../utils/orders.js'
import CartItemsList from '../components/CartItemsList.jsx'
import CineState from '../components/CineState.jsx'
import '../styles/Resumen.css'

export default function Resumen() {
  const { items, subtotal, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleConfirm = () => {
    const orderRecord = buildOrderRecord({
      orderNumber: buildOrderNumber(),
      items,
      subtotal,
      owner: user ? { name: user.name, email: user.email } : null,
    })
    saveOrder(orderRecord)
    clear()
    navigate('/confirmacion', { state: orderRecord })
  }

  return (
    <section className="resumen cinema-x-container">
      <header className="resumen__header">
        <h2 className="resumen__title">Resumen de Compra</h2>
        <div className="resumen__line" aria-hidden="true" />
      </header>

      {items.length === 0 ? (
        <>
          <CineState kind="empty" message="No hay artículos para confirmar." />
          <Link to="/cartelera" className="resumen__empty-link">
            Volver a la cartelera →
          </Link>
        </>
      ) : (
        <>
          <CartItemsList items={items} />

          <div className="resumen__totals">
            <div className="resumen__total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="resumen__total-row resumen__total-row--final">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <div className="resumen__actions">
            <Link to="/carrito" className="resumen__back-link">
              Volver al carrito
            </Link>
            <button type="button" className="btn-marquee" onClick={handleConfirm}>
              Confirmar compra simulada
            </button>
          </div>
        </>
      )}
    </section>
  )
}