import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { stations } from '../data/properties'

function StationCard({ station, navigate }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ height: 300, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img src={station.image} alt={station.label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.3s', opacity: hovered ? 0 : 1,
      }}>
        <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600, fontFamily: 'Playfair Display, serif' }}>
          {station.label}
        </span>
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20,
        display: 'flex', gap: 10, justifyContent: 'center',
        opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s', zIndex: 2,
      }}>
        <button className="btn-outline" onClick={() => navigate(`/location?station=${station.id}`)}>Louer</button>
        <button className="btn-outline" onClick={() => navigate(`/achat?station=${station.id}`)}>Acheter</button>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <section style={{
        height: '100vh',
        background: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://db.quirel.com/storage/v1/object/public/images/website-assets/cf9a4fab-281b-4ea5-a9e9-84b52ec43321.png') center/cover",
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', color: 'white', padding: '0 20px',
      }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 15 }}>
          L'Exception au cœur des Alpes
        </h1>
        <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: 40 }}>
          Vente et Location de prestige en Savoie (73) et Haute-Savoie (74)
        </p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Location Standard', path: '/location', outline: true },
            { label: 'Location de Luxe', path: '/luxe', outline: false },
            { label: 'Achat', path: '/achat', outline: true },
          ].map(({ label, path, outline }) => (
            <button key={path} onClick={() => navigate(path)}
              style={{
                background: outline ? 'white' : 'var(--primary)',
                color: outline ? 'var(--primary)' : 'white',
                border: 'none', padding: '18px 35px',
                fontWeight: 700, textTransform: 'uppercase',
                fontSize: '0.85rem', letterSpacing: 1,
                cursor: 'pointer', minWidth: 200,
                fontFamily: 'Montserrat, sans-serif',
              }}>
              {label}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title-subtitle">Explorez par station</h2>
        <h4 className="section-subtitle">Découvrez nos stations partenaires - forfait inclus dans les locations luxes, et -20% dans les magasins Skimium pour toutes les locations</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
          {stations.map(s => <StationCard key={s.id} station={s} navigate={navigate} />)}
        </div>
      </section>
    </>
  )
}