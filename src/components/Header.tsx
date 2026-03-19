import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Header({ onRdv }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header style={{
      position: 'fixed', width: '100%', top: 0, left: 0,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '15px 5%', background: 'rgba(255,255,255,0.97)',
      zIndex: 3000, boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://db.quirel.com/storage/v1/object/public/images/chat-attachments/feca4381-daad-415f-ac40-670074e0ed03/2f4ce518054a.png"
          alt="Alperia"
          style={{ height: 50 }}
        />
      </Link>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', gap: 25, alignItems: 'center' }} className="desktop-nav">
        <Link to="/achat" style={{ fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = 'var(--primary)'}
          onMouseLeave={e => e.target.style.color = 'inherit'}>
          Achat
        </Link>

        <div style={{ position: 'relative' }}
          onMouseEnter={() => setLocationOpen(true)}
          onMouseLeave={() => setLocationOpen(false)}>
          <span style={{ fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            color: locationOpen ? 'var(--primary)' : 'inherit' }}>
            Location <ChevronDown size={14} />
          </span>
          {locationOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0,
              background: 'white', boxShadow: '0 5px 20px rgba(0,0,0,0.12)',
              minWidth: 160, borderRadius: 4, overflow: 'hidden', zIndex: 100,
            }}>
              {[['Standard', '/location'], ['Luxe', '/luxe']].map(([label, path]) => (
                <Link key={path} to={path} onClick={() => setLocationOpen(false)}
                  style={{ display: 'block', padding: '12px 20px', fontSize: '0.9rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => { e.target.style.background = '#f5f5f5'; e.target.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.color = 'inherit'; }}>
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/about" style={{ fontWeight: 500, fontSize: '0.95rem' }}
          onMouseEnter={e => e.target.style.color = 'var(--primary)'}
          onMouseLeave={e => e.target.style.color = 'inherit'}>
          À propos
        </Link>

        <button className="btn" onClick={onRdv}>Prendre rendez-vous</button>
      </nav>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', padding: 4 }}
        className="mobile-menu-btn">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 80, left: 0, right: 0,
          background: 'white', padding: '20px 5%', zIndex: 9998,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column', gap: 15,
        }}>
          {[['Achat', '/achat'], ['Location Standard', '/location'], ['Location Luxe', '/luxe'], ['À propos', '/about']].map(([label, path]) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)}
              style={{ fontSize: '1.1rem', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              {label}
            </Link>
          ))}
          <button className="btn" onClick={() => { setMenuOpen(false); onRdv(); }}>Prendre rendez-vous</button>
        </div>
      )}
    </header>
  )
}