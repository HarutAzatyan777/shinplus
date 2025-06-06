import React from 'react';
import PaintCalculatorHistory from '../../components/history/PaintCalculatorHistory';
import TilesHistory from './TilesHistory';
import '../../styles/History.css'

const History = () => {
  return (
    <div>
      <PaintCalculatorHistory />
      <TilesHistory />
    </div>
    
  );
};

export default History;
