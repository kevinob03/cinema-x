import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Cartelera from './pages/Cartelera.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cartelera" element={<Cartelera />} />
        </Routes>
      </main>
      <Footer />
      <div className="vhs-scanlines" aria-hidden="true" />
    </div>
  )
}