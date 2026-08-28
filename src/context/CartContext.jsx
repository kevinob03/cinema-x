import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import {
  addOrMergeTicket,
  addPromo,
  cartItemsCount,
  cartSubtotal,
  cartTicketsCount,
  changePromoQuantity,
  createPromoLine,
  createTicketLine,
  removeItem,
} from '../utils/cart.js'

const CartContext = createContext(null)

const initialState = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TICKETS':
      return { items: addOrMergeTicket(state.items, action.ticketLine) }
    case 'ADD_PROMO':
      return { items: addPromo(state.items, action.promoLine) }
    case 'REMOVE_ITEM':
      return { items: removeItem(state.items, action.id) }
    case 'INCREMENT_PROMO':
      return { items: changePromoQuantity(state.items, action.id, 1) }
    case 'DECREMENT_PROMO':
      return { items: changePromoQuantity(state.items, action.id, -1) }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addTickets = useCallback(({ movieId, movieTitle, screening, seats }) => {
    dispatch({ type: 'ADD_TICKETS', ticketLine: createTicketLine({ movieId, movieTitle, screening, seats }) })
  }, [])

  const addPromoItem = useCallback((promo) => {
    dispatch({ type: 'ADD_PROMO', promoLine: createPromoLine(promo) })
  }, [])

  const removeItemAction = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }, [])

  const incrementPromo = useCallback((id) => {
    dispatch({ type: 'INCREMENT_PROMO', id })
  }, [])

  const decrementPromo = useCallback((id) => {
    dispatch({ type: 'DECREMENT_PROMO', id })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const subtotal = useMemo(() => cartSubtotal(state.items), [state.items])
  const ticketsCount = useMemo(() => cartTicketsCount(state.items), [state.items])
  const itemsCount = useMemo(() => cartItemsCount(state.items), [state.items])

  const value = useMemo(
    () => ({
      items: state.items,
      addTickets,
      addPromoItem,
      removeItem: removeItemAction,
      incrementPromo,
      decrementPromo,
      clear,
      subtotal,
      ticketsCount,
      itemsCount,
    }),
    [state.items, addTickets, addPromoItem, removeItemAction, incrementPromo, decrementPromo, clear, subtotal, ticketsCount, itemsCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de <CartProvider>')
  }
  return context
}