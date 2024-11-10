import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "./NavBar";
import Footer from "./Footer";

//import './styles.scss';

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
            <Helmet>
                <title>{ title || "Motion Algorithm Simulator" }</title>
                <meta name="title" content={ title || "Motion Algorithm Simulator" } />
                <meta name="description" content={ description || null} />

                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.1.0/dist/chartjs-plugin-annotation.min.js"></script>
            </Helmet>

            <NavBar />

            <div className="container">{ children }</div>

            <Footer />

            <span className="version">a</span>
        </>
    )
}