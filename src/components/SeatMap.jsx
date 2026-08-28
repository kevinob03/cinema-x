import '../styles/SeatMap.css'

export default function SeatMap({ rows, selected, onToggle }) {
  return (
    <div className="seatmap">
      <div className="seatmap__screen" aria-hidden="true">
        PANTALLA
      </div>
      <div className="seatmap__rows">
        {rows.map((row) => (
          <div key={row.name} className="seatmap__row">
            <span className="seatmap__row-name">{row.name}</span>
            <div className="seatmap__seats">
              {row.seats.map((seat) => {
                const isOccupied = seat.status === 'occupied'
                const isSelected = selected.has(seat.id)
                const classes = ['seat']
                if (isOccupied) classes.push('seat--occupied')
                if (isSelected) classes.push('seat--selected')
                return (
                  <button
                    key={seat.id}
                    type="button"
                    className={classes.join(' ')}
                    disabled={isOccupied}
                    aria-pressed={isSelected}
                    aria-label={`Asiento ${seat.id}${isOccupied ? ' (ocupado)' : ''}`}
                    onClick={() => onToggle(seat.id)}
                  >
                    {seat.id}
                  </button>
                )
              })}
            </div>
            <span className="seatmap__row-name seatmap__row-name--end" aria-hidden="true">
              {row.name}
            </span>
          </div>
        ))}
      </div>
      <div className="seatmap__legend">
        <span className="seatmap__legend-item">
          <span className="seatmap__swatch seatmap__swatch--free" aria-hidden="true" />Disponible
        </span>
        <span className="seatmap__legend-item">
          <span className="seatmap__swatch seatmap__swatch--selected" aria-hidden="true" />Seleccionado
        </span>
        <span className="seatmap__legend-item">
          <span className="seatmap__swatch seatmap__swatch--occupied" aria-hidden="true" />Ocupado
        </span>
      </div>
    </div>
  )
}