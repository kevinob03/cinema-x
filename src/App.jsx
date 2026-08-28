import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Cartelera from './pages/Cartelera.jsx'
import Pelicula from './pages/Pelicula.jsx'
import Proximamente from './pages/Proximamente.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Entradas from './pages/Entradas.jsx'
import MiCuenta from './pages/MiCuenta.jsx'
import Asientos from './pages/Asientos.jsx'
import Carrito from './pages/Carrito.jsx'
import Resumen from './pages/Resumen.jsx'
import Confirmacion from './pages/Confirmacion.jsx'
import Promociones from './pages/Promociones.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cartelera" element={<Cartelera />} />
          <Route path="/proximamente" element={<Proximamente />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/cuenta" element={<MiCuenta />} />
          <Route path="/pelicula/:id" element={<Pelicula />} />
          <Route path="/asientos/:movieId/:screeningId" element={<Asientos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/promociones" element={<Promociones />} />
        </Routes>
      </main>
      <Footer />
      <div className="vhs-scanlines" aria-hidden="true" />
    </div>
  )
}