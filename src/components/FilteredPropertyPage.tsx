import { useState } from 'react'
import PropertyCard from './PropertyCard'
import PropertyDetail from './PropertyDetail'
import { useSearchParams } from 'react-router-dom'

export default function FilteredPropertyPage({ title, subtitle, properties, type, filterOptions, onRdv }) {
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(searchParams.get('station') || 'all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const filtered = activeFilter === 'all'
    ? properties
    : properties.filter(p => p.station === activeFilter)

  const availableStations = filterOptions.filter(f =>
    f.id === 'all' || properties.some(p => p.station === f.id)
  )

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--gray)' }}>
      {/* Hero */}
      <div className="page-hero">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {/* Sidebar */}
      <div className={`filter-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="filter-content">
          <h3>Filtrer par station</h3>
          {availableStations.map(f => (
            <button key={f.id}
              className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => { setActiveFilter(f.id); setSidebarOpen(false) }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`filter-toggle ${sidebarOpen ? 'shifted' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        Filtres
      </button>

      {/* Content */}
      <section className={`page-content ${sidebarOpen ? 'shifted' : ''}`}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>
            Aucun bien disponible pour cette station.
          </p>
        ) : (
          <div className="property-grid">
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} type={type} onClick={setSelectedProperty} />
            ))}
          </div>
        )}
      </section>

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          type={type}
          onClose={() => setSelectedProperty(null)}
          onRdv={(title) => { setSelectedProperty(null); onRdv(title) }}
        />
      )}
    </div>
  )
}