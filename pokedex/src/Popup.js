import React from "react";
import "./popupstyles.css";


const Popup = props => {
    return (
        <div className="popupbox">
            <div className="box">
                {props.content}
                <span className="closeicon" onClick={props.handleClose}>x</span>

            </div>
        </div>
    );
};

export default Popup;