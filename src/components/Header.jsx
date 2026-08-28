import { NavLink } from 'react-router-dom'
import '../styles/Header.css'

export default function Header() {
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
          <button type="button" className="header__icon-btn" aria-label="Carrito (próximamente)">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <div className="header__avatar" aria-hidden="true">
            <span className="material-symbols-outlined header__avatar-icon">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}