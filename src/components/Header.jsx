import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../styles/Header.css'

export default function Header() {
  const { itemsCount } = useCart()

  return (
    <header className="header">
      <div className="header__inner cinema-x-container">
        <NavLink to="/" className="header__logo" aria-label="Cinema X - Inicio">
          <span className="header__brand">Cinema X</span>
        </NavLink>

        <nav className="header__nav" aria-label="Navegación principal">
          <NavLink
            to="/"
            className={({ isActive }) => `header__link ${isActive ? 'header__link--active' : ''}`}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/cartelera"
            className={({ isActive }) => `header__link ${isActive ? 'header__link--active' : ''}`}
          >
            Cartelera
          </NavLink>
        </nav>

        <div className="header__actions">
          <Link
            to="/carrito"
            className="header__icon-btn header__cart"
            aria-label={`Carrito, ${itemsCount} artículo${itemsCount === 1 ? '' : 's'}`}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {itemsCount > 0 && <span className="header__cart-badge">{itemsCount}</span>}
          </Link>
          <div className="header__avatar" aria-hidden="true">
            <span className="material-symbols-outlined header__avatar-icon">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}