// Dependencia de enrutamiento de React
import { Routes, Route } from 'react-router-dom'
// Componentes compartidos: estructura de la página
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

// Páginas de la aplicación
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
import Dulceria from './pages/Dulceria.jsx'

export default function App() {
  // Estructura base: header, contenido enrutado y footer
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          // Página de inicio y secciones principales
          <Route path="/" element={<Inicio />} />
          <Route path="/cartelera" element={<Cartelera />} />
          <Route path="/proximamente" element={<Proximamente />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/cuenta" element={<MiCuenta />} />

          // Detalle con parámetros en la URL: :id = película; movieId/screeningId = función y sala
          <Route path="/pelicula/:id" element={<Pelicula />} />
          <Route path="/asientos/:movieId/:screeningId" element={<Asientos />} />

          // Flujo de compra
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          // Promociones y dulcería disponibles
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/dulceria" element={<Dulceria />} />
        </Routes>
      </main>
      <Footer />
      <div className="vhs-scanlines" aria-hidden="true" />
    </div>
  )
}