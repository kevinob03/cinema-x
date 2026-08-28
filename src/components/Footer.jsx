import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner cinema-x-container">
        <div className="footer__left">
          <span className="footer__end">THE END</span>
          <p className="footer__est">Est. 1984 · Cinema X · Midnight Matinee</p>
        </div>

        <div className="footer__icons" aria-hidden="true">
          <span className="material-symbols-outlined">movie</span>
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="material-symbols-outlined">tv</span>
        </div>

        <div className="footer__right">
          <p className="footer__copy">© 1984 Cinema X.</p>
          <p className="footer__tracking">Tracking error: 0x0045B</p>
        </div>
      </div>
    </footer>
  )
}