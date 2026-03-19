import { useState } from 'react'

const faqs = [
  { q: 'Comment réserver une location ?', a: "Sélectionnez le bien de votre choix, choisissez vos dates via notre calendrier interactif, remplissez vos informations de contact et procédez au paiement sécurisé. Une confirmation vous sera envoyée par email." },
  { q: "Quels sont les horaires d'arrivée et de départ ?", a: "L'arrivée se fait généralement à partir de 17h. Le départ doit être effectué avant 11h. Des arrangements spéciaux peuvent être convenus selon disponibilité." },
  { q: 'Le linge de maison est-il fourni ?', a: "Oui, le linge de lit et les serviettes de toilette sont fournis dans toutes nos locations. Les serviettes de piscine ne sont pas incluses sauf mention contraire." },
  { q: 'Comment visiter un bien à la vente ?', a: "Cliquez sur « Prendre rendez-vous » sur la fiche du bien qui vous intéresse. Notre équipe vous recontactera sous 24h pour organiser une visite à votre convenance." },
  { q: 'Les animaux sont-ils acceptés ?', a: "Cela dépend de chaque propriété. L'acceptation des animaux est précisée sur chaque fiche. Des frais supplémentaires peuvent s'appliquer." },
  { q: 'Comment annuler ma réservation ?', a: "Contactez-nous par téléphone ou email. L'annulation gratuite est possible jusqu'à 48h avant l'arrivée. Consultez nos CGV pour plus de détails." },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div style={{ paddingTop: 80, background: 'var(--gray)', minHeight: '100vh' }}>
      <div className="page-hero">
        <h1>Foire Aux Questions</h1>
        <p>Retrouvez les réponses à vos questions les plus fréquentes</p>
      </div>
      <section style={{ maxWidth: 900, margin: '0 auto' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <h3>{faq.q}</h3>
              <span className={`faq-icon ${openIndex === i ? 'open' : ''}`}>+</span>
            </div>
            {openIndex === i && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}

export function CGV() {
  const articles = [
    { title: 'Article 1 — Objet', text: "Les présentes conditions générales de vente régissent les relations contractuelles entre Alperia et ses clients pour toute transaction immobilière, location ou achat de biens présentés sur ce site." },
    { title: 'Article 2 — Services proposés', text: "Alperia propose des services de vente et de location de biens immobiliers situés en Savoie et Haute-Savoie. Les biens présentés font l'objet de mandats exclusifs ou non exclusifs avec leurs propriétaires." },
    { title: 'Article 3 — Réservation et paiement', text: "Pour les locations, un acompte de 30% est demandé à la réservation. Le solde doit être réglé 30 jours avant l'arrivée. Pour les ventes, les modalités sont définies lors de la signature du compromis." },
    { title: 'Article 4 — Annulation', text: "En cas d'annulation plus de 48h avant l'arrivée, l'acompte est remboursé intégralement. En cas d'annulation moins de 48h, l'acompte est conservé." },
    { title: 'Article 5 — Responsabilité', text: "Alperia s'engage à décrire les biens de manière exacte. Toutefois, les informations présentées n'ont pas valeur contractuelle absolue et peuvent faire l'objet de modifications." },
    { title: 'Article 6 — Protection des données', text: "Les données personnelles collectées sont traitées conformément au RGPD. Elles sont utilisées exclusivement pour le traitement de votre demande et ne sont pas transmises à des tiers sans votre consentement." },
  ]
  return (
    <div style={{ paddingTop: 80, background: 'var(--gray)', minHeight: '100vh' }}>
      <div className="page-hero">
        <h1>Conditions Générales de Vente</h1>
        <p>Dernière mise à jour : Janvier 2026</p>
      </div>
      <section style={{ background: 'white', maxWidth: 900, margin: '40px auto', padding: '50px', borderRadius: 8, boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
        {articles.map((a, i) => (
          <div key={i} style={{ marginBottom: 35 }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: 15, fontSize: '1.3rem' }}>{a.title}</h2>
            <p style={{ lineHeight: 1.8, color: '#555' }}>{a.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}