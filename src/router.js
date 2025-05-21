import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Services from './components/Services';
import Layout from './components/Layout';
import ConcreteCalculator from './pages/calculators/ConcreteCalculator';
import Calculators from './pages/Calculators';
import TilesCalculator from './pages/calculators/TilesCalculator';
import PaintCalculator from './pages/calculators/PaintCalculator'; // ✅ Ավելացված
import GypsumCalculator from './pages/calculators/GypsumCalculator';
import LaminateCalculator from './pages/calculators/LaminateCalculator';
import ElectricWiresCalculator from './pages/calculators/ElectricWiresCalculator';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/calculators" element={<Layout><Calculators /></Layout>} />
      <Route path="/calculators/concrete" element={<Layout><ConcreteCalculator /></Layout>} />
      <Route path="/calculators/tiles" element={<Layout><TilesCalculator /></Layout>} />
      <Route path="/calculators/paint" element={<Layout><PaintCalculator /></Layout>} /> {/* ✅ Ավելացված */}
      <Route path="/calculators/gypsum" element={<Layout><GypsumCalculator /></Layout>} />
      <Route path="/calculators/laminate" element={<Layout><LaminateCalculator /></Layout>} />
      <Route path="/calculators/electric-wires" element={<Layout><ElectricWiresCalculator /></Layout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<Layout><AccountPage /></Layout>} />
      <Route path="/project/:slug" element={<Layout><ProjectDetail /></Layout>} />
    </Routes>
  );
};

export default AppRouter;
