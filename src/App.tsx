import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RdvModal from './components/RdvModal'
import FilteredPropertyPage from './components/FilteredPropertyPage'
import Home from './pages/Home'
import About from './pages/About'
import { FAQ, CGV } from './pages/FaqCgv'
import { saleProperties, rentProperties, luxeProperties } from './data/properties'
import ScrollToTop from './components/ScrollToTop'

const SALE_FILTERS = [
  { id: 'all', label: 'Toutes les stations' },
  { id: 'aillons', label: 'Aillons-Margériaz' },
  { id: 'grand-bornand', label: 'Grand-Bornand' },
  { id: 'la-clusaz', label: 'La Clusaz' },
  { id: '3-vallees', label: '3 Vallées' },
  { id: 'les-arcs', label: 'Les Arcs' },
  { id: 'tignes', label: "Tignes/Val d'Isère" },
]
const RENT_FILTERS = [
  { id: 'all', label: 'Toutes les stations' },
  { id: 'aillons', label: 'Aillons-Margériaz' },
  { id: 'la-clusaz', label: 'La Clusaz' },
  { id: 'grand-bornand', label: 'Grand-Bornand' },
]
const LUXE_FILTERS = [
  { id: 'all', label: 'Toutes les stations' },
  { id: 'les-arcs', label: 'Les Arcs' },
  { id: '3-vallees', label: 'Les 3 Vallées' },
  { id: 'tignes', label: 'Tignes' },
]

function AppContent() {
  const [rdvModal, setRdvModal] = useState({ open: false, property: null })
  const location = useLocation()

  const openRdv = (property = null) => setRdvModal({ open: true, property })
  const closeRdv = () => setRdvModal({ open: false, property: null })

  return (
    <>
      <ScrollToTop /> 
      <Header onRdv={() => openRdv()} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achat" element={
            <FilteredPropertyPage
              key="achat"
              title="Propriétés à la vente"
              subtitle="Découvrez notre sélection exclusive de chalets de prestige au cœur des Alpes françaises."
              properties={saleProperties}
              type="sale"
              filterOptions={SALE_FILTERS}
              onRdv={openRdv}
            />
          } />
          <Route path="/location" element={
            <FilteredPropertyPage
              key="location"
              title="Locations Standard"
              subtitle="Découvrez nos locations pour vos séjours à la montagne."
              properties={rentProperties}
              type="rent"
              filterOptions={RENT_FILTERS}
              onRdv={openRdv}
            />
          } />
          <Route path="/luxe" element={
            <FilteredPropertyPage
              key="luxe"
              title="Locations de Luxe"
              subtitle="Découvrez notre collection exclusive de propriétés d'exception."
              properties={luxeProperties}
              type="rent"
              filterOptions={LUXE_FILTERS}
              onRdv={openRdv}
            />
          } />
          <Route path="/about" element={<About onRdv={openRdv} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="*" element={
            <div style={{ paddingTop: 80, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
              <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary)' }}>Page introuvable</h1>
              <a href="/" className="btn">Retour à l'accueil</a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />

      <RdvModal
        isOpen={rdvModal.open}
        onClose={closeRdv}
        property={rdvModal.property}
      />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}