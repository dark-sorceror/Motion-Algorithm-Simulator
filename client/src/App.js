import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PageNotFound } from './pages/PageNotFound';
import { SimulationPage } from './pages/Simulation';
import { SimulationsPage } from './pages/Simulations'
import { AboutPage } from './pages/About';
import { HomePage } from './pages/Home';

import './styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <HomePage />
                } />

                <Route path="/simulations/" element={
                    <SimulationsPage />
                } />

                <Route path="/about/" element={
                    <AboutPage />
                } />

                <Route path="/pid/" element={
                    <SimulationPage />
                } />

                <Route path="/waypoint-generation/" element={
                    <SimulationPage />
                } />

                <Route path="*" element={
                    <PageNotFound />
                } />
            </Routes>
        </Router>
    );
}

export default App;