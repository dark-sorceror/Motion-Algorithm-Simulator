import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageNotFound } from './pages/PageNotFound';
import { SimulationPage } from './pages/Simulation';
import { SimulationsPage } from './pages/Simulations'
import { AboutPage } from './pages/About';
import { HomePage } from './pages/Home';
import { ErrorBoundary } from './pages/errorBoundary';

import './styles/app.css';

const MainRoutes = [
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <HomePage />
            </ErrorBoundary>
        ),
    },
    {
        path: "simulations",
        element: (
            <ErrorBoundary>
                <SimulationsPage />
            </ErrorBoundary>
        ),
    },
    {
        path: "about",
        element: (
            <ErrorBoundary>
                <AboutPage />
            </ErrorBoundary>
        ),
    },
    {
        path: "pid",
        element: (
            <ErrorBoundary>
                <SimulationPage />
            </ErrorBoundary>
        ),
    },
    {
        path: "waypoint-generation",
        element: (
            <ErrorBoundary>
                <SimulationPage />
            </ErrorBoundary>
        ),
    },
    {
        path: "*",
        element: (
            <ErrorBoundary>
                <PageNotFound />
            </ErrorBoundary>
        ),
    },
];

const router = createBrowserRouter(MainRoutes, {
    basename: import.meta.env.VITE_APP_BASE_NAME,
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
    }
});

function App() {
    return (
        <RouterProvider
            future={{ v7_startTransition: true }}
            router={router}
        />
    );
}

export default App;