import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import SimulationPage from './pages/Simulation';
import PageNotFound from './pages/PageNotFound';
//import { Simulation } from './pages/Simulation';

import './styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <HomePage />
                } />

                <Route path="/pid/" element={
                    <SimulationPage />
                } />

                <Route path="*" element={
                    <PageNotFound />
                } />




                {/*
                <Route path="waypoint-generation" element={
                    {//<Simulation />}
                } />
                 */}
                {/*
                <Route path="*" element={
                    <NoPage />
                } />
                */}
            </Routes>
        </Router>
    );
}

export default App;