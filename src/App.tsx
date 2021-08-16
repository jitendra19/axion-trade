import React from 'react';
import './App.css';

import StockCharts from './components/stockchart';
import Autocomplete from './components/autocomplete';

function App() {
  return (
    <div className="App">
      <Autocomplete></Autocomplete>
      <StockCharts></StockCharts>
    </div>
  );
}

export default App;
