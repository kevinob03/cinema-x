import { getAddablePromotions } from './promotions.js'

export const DULCERIA_CATEGORIES = ['Combos', 'Palomitas', 'Bebidas', 'Dulces', 'Comida', 'Promociones']

export const DULCERIA_PRODUCTS = [
  {
    id: 'combo-maraton',
    category: 'Combos',
    name: 'Combo Maratón Nocturno',
    description: 'Palomitas gigantes, 2 bebidas y dulces surtidos. Para la función de medianoche.',
    price: 6500,
    icon: 'local_pizza',
    image: null,
  },
  {
    id: 'combo-terror',
    category: 'Combos',
    name: 'Combo Terror en VHS',
    description: 'Palomitas saladas + soda de neón y energizante. Sustento del maratón de sustos.',
    price: 5200,
    icon: 'movie',
    image: null,
  },
  {
    id: 'palomitas-clasicas',
    category: 'Palomitas',
    name: 'Palomitas Clásicas',
    description: 'Elaboradas al momento con maíz de la casa. Mantecosas y adictivas.',
    price: 3200,
    icon: 'grain',
    image: null,
  },
  {
    id: 'palomitas-carame',
    category: 'Palomitas',
    name: 'Palomitas Caramelo Neón',
    description: 'Bañadas en caramelo con destellos de sabor retro.',
    price: 3600,
    icon: 'cookie',
    image: null,
  },
  {
    id: 'soda-neon',
    category: 'Bebidas',
    name: 'Soda de Neón',
    description: 'Refresco helado con color fluorescente. Elija su veneno.',
    price: 2100,
    icon: 'science',
    image: null,
  },
  {
    id: 'malteada-espacial',
    category: 'Bebidas',
    name: 'Malteada Espacial',
    description: 'Malteada espesa de fresa neón con chispas. Fuerza alienígena concentrada.',
    price: 2800,
    icon: 'icecream',
    image: null,
  },
  {
    id: 'candy-vhs',
    category: 'Dulces',
    name: 'Candy en VHS',
    description: 'Surtido de golosinas vintage con envoltura retro.',
    price: 2900,
    icon: 'candy',
    image: null,
  },
  {
    id: 'gomitas-mutantes',
    category: 'Dulces',
    name: 'Gomitas Mutantes',
    description: 'Gomitas ácidas de formas extrañas. Mutación dulce garantizada.',
    price: 2400,
    icon: 'cookie',
    image: null,
  },
  {
    id: 'hot-dog-franken',
    category: 'Comida',
    name: 'Hot Dog Frankenstein',
    description: 'Salchicha gruesa con queso derretido y chile. Una criatura digna de las 80s.',
    price: 2900,
    icon: 'lunch_dining',
    image: null,
  },
  {
    id: 'nachos-toxicos',
    category: 'Comida',
    name: 'Nachos Tóxicos',
    description: 'Totopos con queso radioactivo y jalapeños en vinagre.',
    price: 3300,
    icon: 'ramen_dining',
    image: null,
  },
]

function promoToProduct(promo) {
  return {
    id: `promo-${promo.id}`,
    category: 'Promociones',
    name: promo.title,
    description: promo.description,
    price: promo.price,
    icon: promo.icon,
    image: null,
  }
}

export function getDulceriaProducts() {
  const base = [...DULCERIA_PRODUCTS]
  const promos = getAddablePromotions().map(promoToProduct)
  return [...base, ...promos]
}

export function getDulceriaByCategory() {
  const all = getDulceriaProducts()
  return DULCERIA_CATEGORIES.map((category) => ({
    category,
    products: all.filter((product) => product.category === category),
  }))
}
