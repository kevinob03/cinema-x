import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getDulceriaByCategory, DULCERIA_CATEGORIES } from '../data/dulceria.js'
import { formatCurrency } from '../utils/cart.js'
import { useCart } from '../context/CartContext.jsx'
import '../styles/Dulceria.css'

function DulceriaCard({ product, quantity, onChangeQuantity, onAdd }) {
  return (
    <article className="dulceria__card">
      <div className="dulceria__media" role="img" aria-label={`Imagen de ${product.name}`}>
        {product.image ? (
          <img className="dulceria__img" src={product.image} alt={product.name} />
        ) : (
          <span className="material-symbols-outlined dulceria__icon" aria-hidden="true">
            {product.icon}
          </span>
        )}
      </div>

      <div className="dulceria__body">
        <h3 className="dulceria__name">{product.name}</h3>
        <p className="dulceria__description">{product.description}</p>
        <span className="dulceria__price">{formatCurrency(product.price)}</span>
      </div>

      <div className="dulceria__foot">
        <div className="dulceria__stepper">
          <button
            type="button"
            className="dulceria__step"
            aria-label={`Disminuir cantidad de ${product.name}`}
            onClick={() => onChangeQuantity(product.id, -1)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              remove
            </span>
          </button>
          <span className="dulceria__qty">{quantity}</span>
          <button
            type="button"
            className="dulceria__step"
            aria-label={`Aumentar cantidad de ${product.name}`}
            onClick={() => onChangeQuantity(product.id, 1)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              add
            </span>
          </button>
        </div>
        <button
          type="button"
          className="btn-marquee dulceria__add"
          disabled={quantity === 0}
          onClick={() => onAdd(product, quantity)}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default function Dulceria() {
  const navigate = useNavigate()
  const { addPromoItem } = useCart()
  const categories = getDulceriaByCategory()
  const [activeCategory, setActiveCategory] = useState(DULCERIA_CATEGORIES[0])
  const [quantities, setQuantities] = useState({})

  const changeQuantity = (productId, delta) => {
    setQuantities((current) => {
      const next = { ...current }
      next[productId] = Math.max(0, (next[productId] ?? 0) + delta)
      return next
    })
  }

  const handleAdd = (product, quantity) => {
    if (quantity <= 0) return
    addPromoItem({
      id: product.id,
      title: product.name,
      icon: product.icon,
      accent: product.category,
      price: product.price,
      quantity,
    })
    setQuantities((current) => ({ ...current, [product.id]: 0 }))
    navigate('/carrito')
  }

  const active = categories.find((group) => group.category === activeCategory) ?? categories[0]

  return (
    <section className="dulceria cinema-x-container">
      <header className="dulceria__header">
        <h2 className="dulceria__title">Dulcería</h2>
        <div className="dulceria__line" aria-hidden="true" />
        <p className="dulceria__intro">
          Golosinas, comida y combos para acompañar tu función de medianoche.
        </p>
      </header>

      <nav className="dulceria__nav" aria-label="Categorías de Dulcería">
        {DULCERIA_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`dulceria__tab ${category === activeCategory ? 'dulceria__tab--active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="dulceria__grid">
        {active.products.map((product) => (
          <DulceriaCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] ?? 0}
            onChangeQuantity={changeQuantity}
            onAdd={handleAdd}
          />
        ))}
      </div>

      <div className="dulceria__actions">
        <Link to="/carrito" className="dulceria__cart-link">
          Ir al carrito →
        </Link>
      </div>
    </section>
  )
}
