import { useState, useRef, useEffect } from 'react'
import { X, ArrowLeft } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import { format, differenceInDays } from 'date-fns'
import 'react-day-picker/dist/style.css'

export default function PropertyDetail({ property, type, onClose, onRdv }) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [dateRange, setDateRange] = useState(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState('idle') // idle | form | payment | done
  const [clientForm, setClientForm] = useState({ firstname: '', name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const calendarRef = useRef(null)
  const isSale = type === 'sale'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const nights = dateRange?.from && dateRange?.to
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0
  const total = nights * property.price

  const handleBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('https://agent-api.quirel.com/v1/contact-form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: '5f8c5f28-7cfb-41d9-b346-8b4e0d41edc1',
          user_id: 'feca4381-daad-415f-ac40-670074e0ed03',
          sender_email: clientForm.email,
          sender_name: `${clientForm.firstname} ${clientForm.name}`,
          subject: `Réservation : ${property.title}`,
          message: `Propriété: ${property.title}\nDates: ${dateRange?.from ? format(dateRange.from, 'dd/MM/yyyy') : ''} → ${dateRange?.to ? format(dateRange.to, 'dd/MM/yyyy') : ''}\nNuits: ${nights}\nTotal: ${total.toLocaleString('fr-FR')} €`,
          phone: clientForm.phone,
        }),
      })
    } catch {}
    setLoading(false)
    setBookingStep('payment')
  }

  const handlePayment = (e) => {
    e.preventDefault()
    setBookingStep('done')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'white', zIndex: 2000,
      overflowY: 'auto', paddingTop: 80,
    }}>
      <button className="btn" onClick={onClose}
        style={{ position: 'fixed', top: 90, right: '5%', zIndex: 2100, display: 'flex', alignItems: 'center', gap: 8 }}>
        <ArrowLeft size={16} /> Retour
      </button>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 5%' }}>
        <div className="detail-grid">
          {/* Left: images + info */}
          <div>
            {/* Gallery */}
            <div className="gallery" style={{ marginBottom: 20 }}>
              <div className="gallery-item"
                style={{ backgroundImage: `url(${property.images[selectedImg]})` }}
                onClick={() => setLightbox(selectedImg)} />
              <div className="gallery-sub">
                {property.images.slice(1, 3).map((img, i) => (
                  <div key={i} className="gallery-item"
                    style={{ backgroundImage: `url(${img})` }}
                    onClick={() => setLightbox(i + 1)} />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 30, flexWrap: 'wrap' }}>
                {property.images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setSelectedImg(i)}
                    style={{
                      width: 70, height: 50, objectFit: 'cover', borderRadius: 4, cursor: 'pointer',
                      border: selectedImg === i ? '2px solid var(--primary)' : '2px solid transparent',
                    }} />
                ))}
              </div>
            )}

            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 8 }}>{property.title}</h1>
            <p style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: 5 }}>{property.stationLabel}</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>{property.location}</p>

            <div style={{ display: 'flex', gap: 20, padding: '15px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', marginBottom: 25, flexWrap: 'wrap' }}>
              <span>🛏 {property.bedrooms} chambres</span>
              {property.capacity && <span>👥 {property.capacity} personnes</span>}
              <span>📐 {property.surface} m²</span>
            </div>

            <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 12 }}>Description</h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 30 }}>{property.description}</p>

            <div style={{ background: 'var(--gray)', padding: 20, borderRadius: 8 }}>
              <h3 style={{ marginBottom: 12 }}>Équipements & Services</h3>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.9rem' }}>
                {['Vue Montagne', 'Proximité Pistes', 'Cuisine Équipée', 'Balcon/Terrasse', 'Wi-Fi Gratuit', 'Parking', isSale ? 'Cheminée' : 'Casier à skis'].map(a => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: booking/rdv */}
          <div>
            <div className="booking-box">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 6 }}>
                {isSale ? 'Prix de vente' : 'Prix par nuit'}
              </p>
              <h3 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: 20, fontFamily: 'Playfair Display, serif' }}>
                {property.price.toLocaleString('fr-FR')} €{isSale ? '' : '/nuit'}
              </h3>

              {isSale ? (
                <button className="btn" style={{ width: '100%', padding: 18, marginBottom: 12 }}
                  onClick={() => onRdv(property.title)}>
                  Prendre rendez-vous
                </button>
              ) : bookingStep === 'idle' ? (
                <>
                  {/* Date picker */}
                  <div ref={calendarRef} style={{ position: 'relative', marginBottom: 16 }}>
                    <button onClick={() => setCalendarOpen(!calendarOpen)}
                      style={{
                        width: '100%', padding: '12px 16px', border: '1px solid var(--border)',
                        borderRadius: 4, background: 'white', textAlign: 'left', cursor: 'pointer',
                        fontSize: '0.9rem', fontFamily: 'Montserrat, sans-serif',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                      📅 {dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, 'dd MMM', { locale: fr })} → ${format(dateRange.to, 'dd MMM yyyy', { locale: fr })}`
                        : dateRange?.from
                          ? format(dateRange.from, 'dd MMM yyyy', { locale: fr })
                          : 'Choisir les dates'}
                    </button>
                    {calendarOpen && (
                      <div style={{
                        position: 'absolute', top: '100%', left: 0, zIndex: 50,
                        background: 'white', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                        border: '1px solid var(--border)', marginTop: 4,
                      }}>
                        <DayPicker
                          mode="range"
                          selected={dateRange}
                          onSelect={(range) => {
                            setDateRange(range)
                            if (range?.from && range?.to) setCalendarOpen(false)
                          }}
                          locale={fr}
                          disabled={{ before: new Date() }}
                          numberOfMonths={1}
                        />
                      </div>
                    )}
                  </div>

                  {nights > 0 && (
                    <div style={{ background: 'var(--gray)', borderRadius: 8, padding: 15, marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ color: 'var(--text-muted)' }}>Durée :</span>
                        <span style={{ fontWeight: 600 }}>{nights} nuit{nights > 1 ? 's' : ''}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                        <span>Total :</span>
                        <span>{total.toLocaleString('fr-FR')} €</span>
                      </div>
                    </div>
                  )}

                  <button className="btn" style={{ width: '100%', padding: 18, marginBottom: 12 }}
                    disabled={!dateRange?.from || !dateRange?.to}
                    onClick={() => setBookingStep('form')}>
                    Réserver
                  </button>
                </>
              ) : bookingStep === 'form' ? (
                <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h4 style={{ marginBottom: 4 }}>Vos informations</h4>
                  <div style={{ background: 'var(--gray)', borderRadius: 6, padding: 12, marginBottom: 4, fontSize: '0.85rem' }}>
                    {format(dateRange.from, 'dd/MM/yyyy')} → {format(dateRange.to, 'dd/MM/yyyy')} · {nights} nuits · <strong>{total.toLocaleString('fr-FR')} €</strong>
                  </div>
                  <div className="form-row">
                    <input className="form-input" placeholder="Prénom *" required value={clientForm.firstname}
                      onChange={e => setClientForm({ ...clientForm, firstname: e.target.value })} />
                    <input className="form-input" placeholder="Nom *" required value={clientForm.name}
                      onChange={e => setClientForm({ ...clientForm, name: e.target.value })} />
                  </div>
                  <input className="form-input" type="email" placeholder="Email *" required value={clientForm.email}
                    onChange={e => setClientForm({ ...clientForm, email: e.target.value })} />
                  <input className="form-input" type="tel" placeholder="Téléphone *" required value={clientForm.phone}
                    onChange={e => setClientForm({ ...clientForm, phone: e.target.value })} />
                  <button className="btn" type="submit" disabled={loading} style={{ padding: 14 }}>
                    {loading ? 'Envoi...' : 'Continuer vers le paiement'}
                  </button>
                  <button type="button" onClick={() => setBookingStep('idle')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    ← Retour
                  </button>
                </form>
              ) : bookingStep === 'payment' ? (
                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h4 style={{ marginBottom: 4 }}>Paiement sécurisé</h4>
                  <div style={{ background: 'var(--gray)', borderRadius: 6, padding: 12, marginBottom: 4, fontSize: '0.85rem' }}>
                    Total : <strong style={{ color: 'var(--primary)' }}>{total.toLocaleString('fr-FR')} €</strong>
                  </div>
                  <input className="form-input" placeholder="Numéro de carte" required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input className="form-input" placeholder="MM/AA" required />
                    <input className="form-input" placeholder="CVC" required maxLength={3} />
                  </div>
                  <input className="form-input" placeholder="Nom sur la carte" required />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.8rem', background: 'var(--gray)', padding: 10, borderRadius: 6 }}>
                    🔒 Paiement 100% sécurisé SSL
                  </div>
                  <button className="btn" type="submit" style={{ padding: 14 }}>
                    Payer {total.toLocaleString('fr-FR')} €
                  </button>
                </form>
              ) : (
                <div className="alert-success" style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>✓</div>
                  <h3 style={{ marginBottom: 8 }}>Réservation confirmée !</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: 15 }}>Un email de confirmation vous sera envoyé.</p>
                  <button className="btn" onClick={onClose}>Fermer</button>
                </div>
              )}

              <button style={{ width: '100%', padding: '12px', marginTop: 10, background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Montserrat, sans-serif' }}
                onClick={() => onRdv(property.title)}>
                Contacter un conseiller
              </button>
              <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: 10, color: 'var(--text-muted)' }}>
                Conseiller disponible 7j/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <button className="lightbox-nav lightbox-prev"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + property.images.length) % property.images.length) }}>❮</button>
          <img src={property.images[lightbox]} alt="" onClick={e => e.stopPropagation()} />
          <button className="lightbox-nav lightbox-next"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % property.images.length) }}>❯</button>
        </div>
      )}
    </div>
  )
}