import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Services from './components/Services' 
import Layout from './components/Layout'
import ConcreteCalculator from './pages/calculators/ConcreteCalculator'
import Calculators from './pages/Calculators'
import TilesCalculator from './pages/calculators/TilesCalculator'
import PaintCalculator from './pages/calculators/PaintCalculator'  // <-- այստեղ ավելացրու
import GypsumCalculator from './pages/calculators/GypsumCalculator'
const AppRouter = () => {
  return (
    <Routes>
      {/* Wrapped in layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/services"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />
      <Route path="/calculators" element={<Layout><Calculators /></Layout>} />
      <Route path="/calculators/concrete" element={<Layout><ConcreteCalculator /></Layout>} />
      <Route path="/calculators/tiles" element={<Layout><TilesCalculator /></Layout>} />
      <Route path="/calculators/paint" element={<Layout><PaintCalculator /></Layout>} />  {/* <-- այստեղ ավելացրու */}
      <Route path="/calculators/gypsum" element={<Layout><GypsumCalculator /></Layout>} />
      {/* Standalone page */}
      <Route path="/project/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}

export default AppRouter
