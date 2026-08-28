import { Link } from 'react-router-dom'
import Promotions from '../components/Promotions.jsx'
import { useCart } from '../context/CartContext.jsx'
import { PROMOTIONS } from '../data/promotions.js'
import '../styles/Promotions.css'

export default function Promociones() {
  const { addPromoItem, items } = useCart()
  const addedIds = items.filter((item) => item.type === 'promo').map((item) => item.promoId)

  return (
    <section className="promos-page cinema-x-container">
      <header className="promos-page__header">
        <h2 className="promos-page__title">Promociones</h2>
        <div className="promos-page__line" aria-hidden="true" />
        <p className="promos-page__intro">
          Ofertas de la cartelera. Las promociones con precio se pueden agregar al carrito.
        </p>
      </header>

      <Promotions promotions={PROMOTIONS} onAdd={addPromoItem} addedIds={addedIds} />

      <div className="promos-page__actions">
        <Link to="/carrito" className="promos-page__cart-link">
          Ir al carrito →
        </Link>
      </div>
    </section>
  )
}