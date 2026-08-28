export const PROMOTIONS = [
  {
    id: 'combo-mutante',
    type: 'addable',
    icon: 'local_pizza',
    title: 'El Combo Mutante',
    accent: 'Tamaño gigante',
    description: 'Palomitas radiactivas gigantes + 2 sodas tóxicas. Su compañero de maratón.',
    price: 4900,
  },
  {
    id: 'soda-toxica',
    type: 'addable',
    icon: 'science',
    title: 'Soda Tóxica',
    accent: 'Extra grande',
    description: 'Refresco extra grande con hielo de neón. Elija su veneno.',
    price: 2100,
  },
  {
    id: 'candy-medianoche',
    type: 'addable',
    icon: 'candy',
    title: 'Candy de Medianoche',
    accent: 'Golosinas VHS',
    description: 'Surtido de dulces vintage con envoltura retro.',
    price: 2900,
  },
  {
    id: 'martes-2x1',
    type: 'info',
    icon: 'confirmation_number',
    title: 'Martes 2×1',
    accent: 'Solo martes',
    description: 'Cada segundo boleto a mitad de precio. Aplica en taquilla.',
  },
  {
    id: 'doble-funcion',
    type: 'info',
    icon: 'movie',
    title: 'Doble Función',
    accent: 'Pasada la medianoche',
    description: 'Dos películas por el precio de una función de medianoche.',
  },
]

export function getAddablePromotions() {
  return PROMOTIONS.filter((promo) => promo.type === 'addable')
}