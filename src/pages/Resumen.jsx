import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { buildOrderNumber, formatCurrency } from '../utils/cart.js'
import { buildOrderId, buildOrderRecord, saveOrder } from '../utils/orders.js'
import CartItemsList from '../components/CartItemsList.jsx'
import CineState from '../components/CineState.jsx'
import '../styles/Resumen.css'

const DELIVERY_OPTIONS = [
  { id: 'recoger', label: 'Recoger en Dulcería', description: 'Pase por la Dulcería al llegar al cine y muestre su QR.' },
  { id: 'asiento', label: 'Entrega en asiento', description: 'Le llevamos su pedido a la sala y asiento indicado.' },
]

export default function Resumen() {
  const { items, subtotal, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState('recoger')

  const hasDulceria = items.some((line) => line.type === 'promo')

  const handleConfirm = () => {
    const orderRecord = buildOrderRecord({
      orderId: buildOrderId(),
      orderNumber: buildOrderNumber(),
      items,
      subtotal,
      owner: user ? { name: user.name, email: user.email } : null,
      delivery: hasDulceria ? { id: delivery, label: DELIVERY_OPTIONS.find((option) => option.id === delivery).label } : null,
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

          {hasDulceria && (
            <div className="resumen__delivery">
              <h3 className="resumen__delivery-title">Entrega de la Dulcería</h3>
              <p className="resumen__delivery-intro">
                ¿Cómo desea recibir su orden de la Dulcería?
              </p>
              <div className="resumen__delivery-options">
                {DELIVERY_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`resumen__delivery-option ${
                      delivery === option.id ? 'resumen__delivery-option--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={delivery === option.id}
                      onChange={() => setDelivery(option.id)}
                      className="resumen__delivery-input"
                    />
                    <span className="resumen__delivery-option-title">{option.label}</span>
                    <span className="resumen__delivery-option-desc">{option.description}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

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