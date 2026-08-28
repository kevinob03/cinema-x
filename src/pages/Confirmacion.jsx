import { Link, useLocation } from 'react-router-dom'
import { formatCurrency } from '../utils/cart.js'
import '../styles/Confirmacion.css'

export default function Confirmacion() {
  const location = useLocation()
  const order = location.state ?? null

  return (
    <section className="confirmacion cinema-x-container">
      <div className="confirmacion__ticket">
        <div className="confirmacion__top">
          <span className="confirmacion__label">Boleto emitido</span>
          <span className="confirmacion__order">{order?.orderNumber ?? 'CX-??????'}</span>
        </div>

        <div className="confirmacion__badge">
          <span className="material-symbols-outlined confirmacion__check" aria-hidden="true">
            confirmation_number
          </span>
          <h2 className="confirmacion__title">Compra Confirmada</h2>
          <p className="confirmacion__text">
            Su reserva simulada está lista. ¡Recuerde que esto es una demo!
          </p>
        </div>

        {order && (
          <div className="confirmacion__items">
            {order.items.map((line) => (
              <div key={line.id} className="confirmacion__item">
                <div>
                  <h4 className="confirmacion__item-title">{line.title ?? line.movieTitle}</h4>
                  {line.type === 'ticket' ? (
                    <span className="confirmacion__item-meta">
                      {line.dayLabel} · {line.time} · {line.room} · {line.seats.join(', ')}
                    </span>
                  ) : (
                    <span className="confirmacion__item-meta">Promoción de Cinema X</span>
                  )}
                </div>
                <span className="confirmacion__item-price">{formatCurrency(line.subtotal)}</span>
              </div>
            ))}
            <div className="confirmacion__total">
              <span>Total pagado</span>
              <span className="confirmacion__total-value">{formatCurrency(order.subtotal)}</span>
            </div>
          </div>
        )}

        <div className="confirmacion__footer">
          <Link to="/cartelera" className="btn-marquee">
            Volver a la cartelera
          </Link>
          <p className="confirmacion__demo">Simulación de compra · Sin pago real.</p>
        </div>
      </div>
    </section>
  )
}