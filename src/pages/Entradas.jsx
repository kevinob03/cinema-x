import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItemsList from '../components/CartItemsList.jsx'
import CineState from '../components/CineState.jsx'
import { getOrders } from '../utils/orders.js'
import { formatCurrency } from '../utils/cart.js'
import '../styles/Entradas.css'

function formatOrderDate(iso) {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Entradas() {
  const [orders] = useState(() => getOrders())

  return (
    <section className="entradas cinema-x-container">
      <header className="entradas__header">
        <h2 className="entradas__title">Mis Entradas</h2>
        <div className="entradas__line" aria-hidden="true" />
        <p className="entradas__intro">
          Tus compras simuladas quedan guardadas en este navegador.
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="entradas__empty">
          <CineState kind="empty" message="Todavía no tienes entradas emitidas." />
          <Link to="/cartelera" className="entradas__empty-link">
            Ir a la cartelera →
          </Link>
        </div>
      ) : (
        <div className="entradas__list">
          {orders.map((order) => (
            <article key={order.orderNumber} className="entradas__order">
              <div className="entradas__order-head">
                <div className="entradas__order-meta">
                  <h3 className="entradas__order-id">{order.orderNumber}</h3>
                  <span className="entradas__order-date">
                    {formatOrderDate(order.createdAt)}
                    {order.owner ? ` · ${order.owner.name}` : ' · Pase en taquilla'}
                  </span>
                </div>
                <span className="entradas__order-total">{formatCurrency(order.subtotal)}</span>
              </div>
              <CartItemsList items={order.items} />
            </article>
          ))}
        </div>
      )}

      <div className="entradas__actions">
        <Link to="/cartelera" className="btn-marquee">
          Comprar más entradas
        </Link>
      </div>
    </section>
  )
}