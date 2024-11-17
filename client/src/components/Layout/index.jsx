import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { config } from '../../config';

import NavBar from "../NavBar";

import './styles.scss';

export const RESET_URL = 'reset';

export function reportUrlChange(arg) {
    const data = {
        type: 'iframe_url',
        message: arg === RESET_URL ? '' : window.location.href,
    }

    window.parent.postMessage(data, '*');
}

export default ({ children, title, description }) => {
    useEffect(() => {
        window.addEventListener('hashchange', reportUrlChange)
        reportUrlChange()
        return () => window.removeEventListener('hashchange', reportUrlChange)
    }, [])

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ title || "Motion Algorithm Simulator" }</title>
                    <meta name="title" content={ title || "Motion Algorithm Simulator" } />
                    <meta name="description" content={ description || null} />

                    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.1.0/dist/chartjs-plugin-annotation.min.js"></script>
                </Helmet>
            </HelmetProvider>

            <NavBar />

            <div className="container">{ children }</div>

            <span className="version">v{ config.VERSION }</span>
        </>
    )
}