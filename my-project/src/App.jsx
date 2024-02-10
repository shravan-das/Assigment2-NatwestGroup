import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WeatherDetail from './components/WeatherDetail';
import ChartComponent from './components/ChartComponent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherDetail />} />
      <Route path="/charts" element={<ChartComponent />} />
    </Routes>
  );
};

export default App;
