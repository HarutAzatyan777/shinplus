import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Services from './components/Services' 
import Layout from './components/Layout'

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

      {/* Standalone page */}
      <Route path="/project/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}

export default AppRouter
