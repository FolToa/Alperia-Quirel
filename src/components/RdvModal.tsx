import { useState } from 'react'

export default function RdvModal({ isOpen, onClose, property }) {
  const [form, setForm] = useState({ firstname: '', name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://agent-api.quirel.com/v1/contact-form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: '5f8c5f28-7cfb-41d9-b346-8b4e0d41edc1',
          user_id: 'feca4381-daad-415f-ac40-670074e0ed03',
          sender_email: form.email,
          sender_name: `${form.firstname} ${form.name}`,
          subject: property ? `Demande de RDV : ${property}` : 'Demande de rendez-vous',
          message: form.message + (property ? `\n\nPropriété : ${property}` : ''),
          phone: form.phone,
        }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 style={{ color: 'var(--primary)', marginBottom: 8, fontFamily: 'Playfair Display, serif' }}>Prendre rendez-vous</h2>
        {property && <p style={{ color: 'var(--text-muted)', marginBottom: 25, fontSize: '0.9rem' }}>{property}</p>}

        {status === 'success' ? (
          <div className="alert-success" style={{ padding: 20 }}>
            <p style={{ marginBottom: 15 }}>✓ Votre demande a bien été envoyée ! Nous vous recontactons dans les plus brefs délais.</p>
            <button className="btn" onClick={onClose}>Fermer</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-row">
              <input className="form-input" placeholder="Prénom *" required value={form.firstname}
                onChange={e => setForm({ ...form, firstname: e.target.value })} />
              <input className="form-input" placeholder="Nom *" required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <input className="form-input" type="email" placeholder="Email *" required value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="form-input" type="tel" placeholder="Téléphone" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
            <textarea className="form-input" placeholder="Message (optionnel)" value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })} />
            {status === 'error' && <div className="alert-error">Une erreur est survenue. Veuillez réessayer.</div>}
            <button className="btn" type="submit" disabled={loading} style={{ marginTop: 8, padding: '14px' }}>
              {loading ? 'Envoi...' : 'Envoyer ma demande'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}