export default function PropertyCard({ property, onClick, type = 'rent' }) {
  const isSale = type === 'sale'
  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={() => onClick(property)}>
      <img src={property.image} alt={property.title} />
      <div className="card-body">
        <p className="card-station">{property.stationLabel}</p>
        <h3 className="card-title">{property.title}</h3>
        <div className="card-specs">
          {isSale ? (
            <>
              <span>{property.rooms} pièces</span>
              <span>•</span>
              <span>{property.bedrooms} ch.</span>
              <span>•</span>
              <span>{property.surface} m²</span>
            </>
          ) : (
            <>
              <span>{property.bedrooms} ch.</span>
              <span>•</span>
              <span>{property.capacity} pers.</span>
              <span>•</span>
              <span>{property.surface} m²</span>
            </>
          )}
        </div>
        <p className="price">
          {isSale
            ? `${property.price.toLocaleString('fr-FR')} €`
            : `${property.price.toLocaleString('fr-FR')} €/nuit`}
        </p>
      </div>
    </div>
  )
}