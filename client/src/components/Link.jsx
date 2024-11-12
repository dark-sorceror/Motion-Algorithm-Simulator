import React from "react";
import { Link } from "react-router-dom";

class _Link extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const { children, to, ...other } = this.props;
        //analytics later
        //
    }

    render() {
        const { children, to, ...other } = this.props;
        const internal = /^\/(?!\/)/.test(to);

        if (internal) {
            return (
                <Link
                    to={to}
                    {...other}
                    onClick={this.handleClick}
                >
                    {children}
                </Link>
            );
        }

        return (
            <a href={to} {...other} onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}

export default _Link;