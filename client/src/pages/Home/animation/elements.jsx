import React from "react";

export class AnimationElements extends React.Component {
    constructor(props) {
        super(props);


    }

    render () {
        return (
            <>
                <div className="target-x">x</div>
                <div className="obstacle-o o1">o</div>
                <div className="obstacle-o o2">o</div>
                <div className="obstacle-o o3">o</div>
            </>
        )
    }
}