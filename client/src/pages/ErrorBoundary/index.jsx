import React from "react";

import { Layout } from "../../components/Layout";

import './styles.css';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Layout
                    title="Motion Algorithm Simulator"
                    description="Visualize the various algorithms for generating, controlling, and tracking motion paths through simulations"
                >
                    <div className="error">
                        <h1>Something went wrong. Please try again later.</h1>
                        <button onClick={this.resetError }>
                            Retry
                        </button>
                    </div>
                </Layout>
            );
        }

        return this.props.children;
    }
}