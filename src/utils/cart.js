export function formatCurrency(value) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(value)
}

export function createTicketLine({ movieId, movieTitle, screening, seats }) {
  const sortedSeats = [...seats].sort(
    (a, b) => a.length - b.length || a.localeCompare(b),
  )
  return {
    id: `ticket-${screening.id}`,
    type: 'ticket',
    movieId,
    movieTitle,
    screeningId: screening.id,
    dayLabel: screening.dayLabel,
    time: screening.time,
    room: screening.room,
    price: screening.price,
    seats: sortedSeats,
    quantity: sortedSeats.length,
    subtotal: screening.price * sortedSeats.length,
  }
}

export function addOrMergeTicket(items, ticketLine) {
  const existing = items.find(
    (item) => item.type === 'ticket' && item.screeningId === ticketLine.screeningId,
  )
  if (!existing) {
    return [...items, ticketLine]
  }
  const mergedSeats = Array.from(new Set([...existing.seats, ...ticketLine.seats])).sort(
    (a, b) => a.length - b.length || a.localeCompare(b),
  )
  return items.map((item) =>
    item.type === 'ticket' && item.screeningId === ticketLine.screeningId
      ? {
          ...item,
          seats: mergedSeats,
          quantity: mergedSeats.length,
          subtotal: item.price * mergedSeats.length,
        }
      : item,
  )
}

export function createPromoLine(promo) {
  const quantity = promo.quantity ?? 1
  return {
    id: `promo-${promo.id}`,
    type: 'promo',
    promoId: promo.id,
    title: promo.title,
    icon: promo.icon,
    accent: promo.accent,
    price: promo.price,
    quantity,
    subtotal: promo.price * quantity,
  }
}

export function addPromo(items, promoLine) {
  return items.some((item) => item.id === promoLine.id) ? items : [...items, promoLine]
}

export function changePromoQuantity(items, id, delta) {
  const target = items.find((item) => item.id === id && item.type === 'promo')
  if (!target) return items
  const nextQuantity = target.quantity + delta
  if (nextQuantity <= 0) {
    return items.filter((item) => item.id !== id)
  }
  return items.map((item) =>
    item.id === id
      ? { ...item, quantity: nextQuantity, subtotal: item.price * nextQuantity }
      : item,
  )
}

export function removeItem(items, id) {
  return items.filter((item) => item.id !== id)
}

export function cartSubtotal(items) {
  return items.reduce((sum, item) => sum + item.subtotal, 0)
}

export function cartTicketsCount(items) {
  return items
    .filter((item) => item.type === 'ticket')
    .reduce((sum, item) => sum + item.quantity, 0)
}

export function cartItemsCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function buildOrderNumber() {
  const randomPart = Math.floor(1000 + Math.random() * 9000)
  return `CX-${new Date().getFullYear()}-${randomPart}`
}