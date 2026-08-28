const STORAGE_KEY = 'cinemaX_orders'

export function buildOrderRecord({ orderNumber, items, subtotal, owner }) {
  return {
    orderNumber,
    createdAt: new Date().toISOString(),
    owner: owner ?? null,
    items,
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