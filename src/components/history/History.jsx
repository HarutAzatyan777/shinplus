import React from 'react';
import PaintCalculatorHistory from '../../components/history/PaintCalculatorHistory';
import TilesHistory from './TilesHistory';
import '../../styles/History.css'
import LaminateHistory from './LaminateHistory';

const History = () => {
  return (
    <div>
      <PaintCalculatorHistory />
      <TilesHistory />
      <LaminateHistory />
    </div>
    
  );
};

export default History;
