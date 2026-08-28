import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isFavorite, toggleFavorite } from '../utils/favorites.js'

const STORAGE_KEY = 'cinemaX_favorites'
const FavoritesContext = createContext(null)

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // almacenamiento no disponible: se mantiene solo en memoria
    }
  }, [favorites])

  const toggle = useCallback((movie) => {
    setFavorites((current) => toggleFavorite(current, movie))
  }, [])

  const checkFavorite = useCallback((id) => isFavorite(favorites, id), [favorites])

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: checkFavorite,
      toggleFavorite: toggle,
    }),
    [favorites, checkFavorite, toggle],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>')
  }
  return context
}