import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/Header.css'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/cartelera', label: 'Cartelera' },
  { to: '/proximamente', label: 'Próximamente' },
  { to: '/dulceria', label: 'Dulcería' },
  { to: '/favoritos', label: 'Mis películas' },
  { to: '/entradas', label: 'Entradas' },
  { to: '/cuenta', label: 'Mi Cuenta' },
]

export default function Header() {
  const { itemsCount } = useCart()
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((open) => !open)

  const navClass = ({ isActive }) => `header__link ${isActive ? 'header__link--active' : ''}`

  return (
    <header className="header">
      <div className="header__inner cinema-x-container">
        <NavLink to="/" className="header__logo" aria-label="Cinema X - Inicio" onClick={closeMenu}>
          <span className="header__brand">Cinema X</span>
        </NavLink>

        <nav
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={navClass}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="header__icon-btn header__menu-btn"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <Link
            to="/carrito"
            className="header__icon-btn header__cart"
            aria-label={`Carrito, ${itemsCount} artículo${itemsCount === 1 ? '' : 's'}`}
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {itemsCount > 0 && <span className="header__cart-badge">{itemsCount}</span>}
          </Link>

          <Link to="/cuenta" className="header__avatar-link" aria-label={user ? `Mi cuenta: ${user.name}` : 'Mi cuenta'} onClick={closeMenu}>
            <span className="header__avatar" aria-hidden="true">
              {user ? (
                <span className="header__avatar-initial">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <span className="material-symbols-outlined header__avatar-icon">person</span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}