const STORAGE_KEY = 'cinemaX_orders'

export function buildOrderId() {
  const random = Math.random().toString(36).slice(2, 10)
  const hex = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return `CX-${random}-${hex}`
}

function buildItemStatus(line) {
  if (line.type === 'ticket') {
    return { kind: 'entrada', status: 'pendiente' }
  }
  return { kind: 'dulceria', status: 'pendiente' }
}

export function buildOrderRecord({ orderId, orderNumber, items, subtotal, owner, delivery }) {
  return {
    orderId,
    orderNumber,
    createdAt: new Date().toISOString(),
    owner: owner ?? null,
    delivery: delivery ?? null,
    items: items.map((line) => ({
      ...line,
      status: buildItemStatus(line),
    })),
    subtotal,
  }
}

export function isDuplicateOrder(orders, orderNumber) {
  return orders.some((order) => order.orderNumber === orderNumber)
}

export function appendOrder(orders, order) {
  if (isDuplicateOrder(orders, order.orderNumber)) return orders
  return [order, ...orders]
}

export function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  try {
    const next = appendOrder(getOrders(), order)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return true
  } catch {
    return false
  }
}