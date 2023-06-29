import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import './App.css';
import DriverTable from './components/DriverTable';
import HomePage from './components/HomePage';
import VehiclesPage from './components/Vehicles';
import AboutPage from './components/About';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    fetch('/data/menu.json')
      .then((response) => response.json())
      .then((data) => setMenuItems(data.data))
      .catch((error) => console.log(error));

    fetch('/data/drivers.json')
      .then((response) => response.json())
      .then((data) => setDriverData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="top-banner"></div>
        <div className="content">
          <div className="side-menu">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drivers" element={<DriverTable drivers={driverData} />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
