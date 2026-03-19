import { useState } from 'react'

const team = [
  { name: 'Marie Dupont', role: 'Directrice & Fondatrice', bio: "15 ans d'expertise en immobilier de montagne. Spécialiste Chalets de Prestige.", img: 'https://db.quirel.com/storage/v1/object/public/images/website-assets/58be0ebf-f5d8-4165-98dc-bb1bcc621429.png' },
  { name: 'Pierre Martin', role: 'Directeur Commercial', bio: "Expert en investissements alpins. Maîtrise parfaite du marché local.", img: 'https://db.quirel.com/storage/v1/object/public/images/website-assets/8089ad74-7741-4196-98b1-55d50bd2f026.png' },
  { name: 'Sophie Bernard', role: 'Conseillère Patrimoniale', bio: "Spécialiste location saisonnière et gestion locative haut de gamme.", img: 'https://db.quirel.com/storage/v1/object/public/images/website-assets/ab05ed23-78d8-47ec-a656-c5cec102c511.png' },
]

const jobs = [
  { title: 'Gestionnaire de Location', type: 'CDI', location: 'Chambéry', desc: "Gestion complète des biens en location saisonnière, relations avec les propriétaires et locataires, suivi des réservations." },
  { title: "Agent d'Entretien", type: 'CDI', location: 'Chambéry', desc: "Entretien et maintenance des propriétés, petites réparations, préparation des chalets entre chaque séjour." },
  { title: 'Hôte(sse) de Réception', type: 'CDD saisonnier', location: 'Chambéry', desc: "Accueil des clients, check-in/check-out, présentation des chalets, assistance durant le séjour." },
]

const history = [
  { year: '2008', title: "Création d'Alperia", text: "Fondation de l'agence à Chambéry avec une vision : révolutionner l'immobilier de montagne." },
  { year: '2012', title: 'Expansion vers la Haute-Savoie', text: "Lancement des pôles location et achat dans le département du 74." },
  { year: '2023', title: 'Partenariats', text: "Mise en place de partenariats avec les stations de ski" },
]

export default function About({ onRdv }) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [contactStatus, setContactStatus] = useState(null)

  const handleContact = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://agent-api.quirel.com/v1/contact-form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: '5f8c5f28-7cfb-41d9-b346-8b4e0d41edc1',
          user_id: 'feca4381-daad-415f-ac40-670074e0ed03',
          sender_email: contactForm.email,
          sender_name: contactForm.name,
          subject: contactForm.subject,
          message: contactForm.message,
          phone: contactForm.phone,
        }),
      })
      setContactStatus(res.ok ? 'success' : 'error')
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <div style={{ paddingTop: 80, background: 'var(--gray)', minHeight: '100vh' }}>
      <div className="page-hero">
        <h1>À Propos d'Alperia</h1>
        <p>Votre partenaire de confiance pour l'immobilier d'exception en Savoie et Haute-Savoie depuis plus de 15 ans.</p>
      </div>

      {/* Team */}
      <section style={{ background: 'white' }}>
        <h2 className="section-title">Notre Équipe</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40, maxWidth: 1200, margin: '0 auto' }}>
          {team.map(m => (
            <div key={m.name} style={{ textAlign: 'center', background: 'var(--gray)', padding: 30, borderRadius: 8, boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ color: 'var(--primary)', marginBottom: 5 }}>{m.name}</h3>
              <p style={{ fontWeight: 600, marginBottom: 10 }}>{m.role}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="section-title">Notre Histoire</h2>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 15 }}>Notre Mission</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>Accompagner nos clients dans la réalisation de leur rêve alpin, en leur offrant un service sur mesure et un accès aux plus belles propriétés de Savoie et Haute-Savoie.</p>
          </div>
          <div style={{ position: 'relative', paddingLeft: 30, borderLeft: '3px solid var(--primary)' }}>
            {history.map((h, i) => (
              <div key={i} style={{ marginBottom: 30, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -42, width: 24, height: 24, background: 'var(--primary)', borderRadius: '50%' }} />
                <h4 style={{ color: 'var(--primary)', marginBottom: 4 }}>{h.year} — {h.title}</h4>
                <p style={{ color: '#555' }}>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section style={{ background: 'white' }}>
        <h2 className="section-title">On recrute !</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30, maxWidth: 1200, margin: '0 auto' }}>
          {jobs.map(j => (
            <div key={j.title} style={{ background: 'var(--gray)', padding: 30, borderRadius: 8, borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: 10 }}>{j.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 15 }}>{j.desc}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>{j.type}</p>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>{j.location}</p>
              <button className="btn" onClick={() => onRdv(`Candidature — ${j.title}`)}>Postuler</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="section-title">Contactez-nous</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 25 }}>Nos Coordonnées</h3>
            {[['Téléphone', '+33 4 79 00 00 00'], ['Email', 'contact@alperia.fr'], ['Adresse', '67 Rue Saint-François de Sales - 73000 Chambéry']].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>{label}</strong>
                <p style={{ color: '#666' }}>{val}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 25 }}>Envoyez-nous un message</h3>
            {contactStatus === 'success' ? (
              <div className="alert-success">Message envoyé avec succès !</div>
            ) : (
              <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input className="form-input" placeholder="Votre nom" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
                <input className="form-input" type="email" placeholder="Votre email *" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                <input className="form-input" type="tel" placeholder="Téléphone (optionnel)" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
                <input className="form-input" placeholder="Sujet" value={contactForm.subject} onChange={e => setContactForm({ ...contactForm, subject: e.target.value })} />
                <textarea className="form-input" rows={4} placeholder="Votre message" value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} />
                {contactStatus === 'error' && <div className="alert-error">Erreur lors de l'envoi.</div>}
                <button className="btn" type="submit">Envoyer</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}