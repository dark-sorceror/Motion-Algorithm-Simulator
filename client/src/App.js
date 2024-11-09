import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Simulation } from './pages/Simulation';

import './styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout />
                } />
                <Route index element = {
                    <Home />
                } />
                <Route path="waypoint-generation" element={
                    <Simulation />
                } />
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