import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/thanks.css'

function Thankyou() {
    return (
        <div id="thanks">
            <div id="header">
                <img
                    src="/Resources/kumbal.jpg"
                    width="100%"
                    height="800px"
                    id="image"
                    style={{objectFit:'fill'}}
                />
                <div
                    classname="navbar navbar-expand-md  navbar-dark container-fluid "
                    id="nav"
                >
                    
                        <img
                            classname="rounded-pill m-2"
                            height="100px"
                            src="/Resources/safar_logo_crop.png"
                            width="100px"
                            style={{margin:'5px',marginLeft:'10px'}}
                        />
                    
                </div>
                <div className="header2">
                    <h1>Thank You!</h1>
                    <p>
                        <b>for contacting us, we will get in touch with you soon...</b>
                    </p>
                    <a href="/" className="btn btn-primary">
                        Back to home
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Thankyou;