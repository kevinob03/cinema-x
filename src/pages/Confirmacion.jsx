import { Link, useLocation } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { formatCurrency } from '../utils/cart.js'
import '../styles/Confirmacion.css'

const ENTRADA_STATUS_LABEL = 'Entrada pendiente'
const DULCERIA_STATUS_LABEL = 'Dulcería pendiente'

export default function Confirmacion() {
  const location = useLocation()
  const order = location.state ?? null

  const tickets = order?.items.filter((line) => line.type === 'ticket') ?? []
  const dulceria = order?.items.filter((line) => line.type === 'promo') ?? []

  return (
    <section className="confirmacion cinema-x-container">
      <div className="confirmacion__ticket">
        <div className="confirmacion__top">
          <span className="confirmacion__label">Pedido emitido</span>
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
          <>
            <div className="confirmacion__qr">
              <h3 className="confirmacion__qr-title">Su código único</h3>
              <div className="confirmacion__qr-code">
                <QRCodeSVG value={order.orderId} size={176} level="M" marginSize={1} />
              </div>
              <p className="confirmacion__qr-id">{order.orderId}</p>
              <p className="confirmacion__demo">Muestre este código en el cine para retirar su pedido.</p>
            </div>

            {tickets.length > 0 && (
              <div className="confirmacion__section">
                <h3 className="confirmacion__section-title">Entradas</h3>
                <div className="confirmacion__items">
                  {tickets.map((line) => (
                    <div key={line.id} className="confirmacion__item">
                      <div>
                        <h4 className="confirmacion__item-title">{line.title ?? line.movieTitle}</h4>
                        <span className="confirmacion__item-meta">
                          {line.dayLabel} · {line.time} · {line.room} · {line.seats.join(', ')}
                        </span>
                      </div>
                      <span className="confirmacion__item-price">{formatCurrency(line.subtotal)}</span>
                    </div>
                  ))}
                  <span className="confirmacion__status">{ENTRADA_STATUS_LABEL}</span>
                </div>
              </div>
            )}

            {dulceria.length > 0 && (
              <div className="confirmacion__section">
                <h3 className="confirmacion__section-title">Dulcería</h3>
                <div className="confirmacion__items">
                  {dulceria.map((line) => (
                    <div key={line.id} className="confirmacion__item">
                      <div>
                        <h4 className="confirmacion__item-title">{line.title}</h4>
                        <span className="confirmacion__item-meta">Dulcería de Cinema X</span>
                      </div>
                      <span className="confirmacion__item-price">{formatCurrency(line.subtotal)}</span>
                    </div>
                  ))}
                  {order.delivery && (
                    <span className="confirmacion__status">{order.delivery.label}</span>
                  )}
                  <span className="confirmacion__status">{DULCERIA_STATUS_LABEL}</span>
                </div>
              </div>
            )}

            <div className="confirmacion__total">
              <span>Total pagado</span>
              <span className="confirmacion__total-value">{formatCurrency(order.subtotal)}</span>
            </div>
          </>
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