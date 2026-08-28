import { formatCurrency } from '../utils/cart.js'
import '../styles/Promotions.css'

export default function Promotions({ promotions, onAdd, addedIds = [] }) {
  return (
    <div className="promotions">
      {promotions.map((promo) => {
        const addable = promo.type === 'addable'
        const added = addedIds.includes(promo.id)
        return (
          <article
            key={promo.id}
            className={`promotions__card ${addable ? 'promotions__card--addable' : 'promotions__card--info'}`}
          >
            <span className="material-symbols-outlined promotions__icon" aria-hidden="true">
              {promo.icon}
            </span>
            <div className="promotions__body">
              <h3 className="promotions__title">{promo.title}</h3>
              <span className="promotions__accent">{promo.accent}</span>
              <p className="promotions__description">{promo.description}</p>
            </div>
            <div className="promotions__aside">
              {addable ? (
                <>
                  <span className="promotions__price">{formatCurrency(promo.price)}</span>
                  <button
                    type="button"
                    className="promotions__add"
                    disabled={added}
                    onClick={() => onAdd(promo)}
                  >
                    {added ? 'Agregado' : 'Agregar'}
                  </button>
                </>
              ) : (
                <span className="promotions__tag">INFO</span>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}