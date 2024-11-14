import "../css/Home.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Master() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);

        let sub = document.getElementById("subMenu");
        sub.classList.toggle("open-menu");
    };


    return (

        <div id="header">
            <img height="400px" src="/Resources/beach_small.jpg" width="100%" />
            <div
                className="navbar navbar-expand-md  navbar-dark container-fluid "
                id="nav"
            >
                <a className="" href="#">
                    <img
                        className="rounded-pill"
                        height="100px"
                        src="/Resources/safar_logo_crop.png"
                        width="100px"
                    />
                </a>
                <button
                    className="navbar-toggler"
                    data-bs-target="#navbar"
                    data-bs-toggle="collapse"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse  "
                    id="navbar"
                    style={{
                        marginLeft: "30px",
                    }}
                >
                    <ul className="navbar-nav ">
                        <li className="nav-item">

                            <Link to="/" className="link nav-link self-active  m-2" > Home </Link>
                        </li>
                        <li className="nav-item">

                            <Link to="/india" className="link nav-link text-light m-2" >India </Link>

                        </li>
                        <li className="nav-item">
                            <Link to="/international" className="link nav-link text-light m-2">International</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="link nav-link text-light m-2">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="link nav-link text-light m-2">Contact us </Link>
                        </li>
                    </ul>
                    <button
                        className="btn btn-primary self-active btn-sm"
                        id="login-btn"
                    >
                        Login
                    </button>
                    <img
                        className="profile-pic"
                        id="profile"
                        onClick={toggleMenu}
                        src="/Resources/user.jpeg"
                    />
                    <i
                        className="fa-solid fa-caret-down"
                        onClick={toggleMenu}
                        style={{
                            color: "rgba(0, 0, 0, 0.92)",
                            cursor: "pointer",
                            marginLeft: "0px",
                        }}
                    />
                    <div className="sub-menu-wrap" id="subMenu">
                        <div className="sub-menu">
                            <div className="user-info">
                                <div>
                                    <img src="/Resources/user3.jpeg" />
                                    <h4>Hetarth Chokshi</h4>
                                </div>
                                <hr />
                                <a className="sub-menu-link" href="#">
                                    <div
                                        style={{
                                            margin: "0 10px",
                                        }}
                                    >
                                        {" "}
                                        <i className="fa-solid fa-user fa-sm" />
                                    </div>
                                    <div>
                                        <p><Link to="" className="link" style={{ color: '#525252' }}>Edit Profile</Link></p>
                                    </div>{" "}
                                    <span
                                        style={{
                                            marginLeft: "35px",
                                            marginTop: "-4px",
                                        }}
                                    >
                                        <i className="fa-solid fa-angle-right fa-2xs" />
                                    </span>
                                </a>
                                <a className="sub-menu-link" href="#">
                                    <div
                                        style={{
                                            margin: "0 8px",
                                        }}
                                    >
                                        {" "}
                                        <i className="fa-solid fa-route fa-sm" />
                                    </div>
                                    <div>
                                        <p>
                                            {" "}
                                            <Link to="" className="link" style={{ color: '#525252' }}> Bookings</Link>{" "}
                                        </p>
                                    </div>{" "}
                                    <span
                                        style={{
                                            marginLeft: "44px",
                                            marginTop: "-4px",
                                        }}
                                    >
                                        <i className="fa-solid fa-angle-right fa-2xs" />
                                    </span>
                                </a>
                                <a className="sub-menu-link" href="#">
                                    <div
                                        style={{
                                            margin: "0 8px",
                                        }}
                                    >
                                        <i className="fa-solid fa-right-from-bracket fa-sm" />
                                    </div>
                                    <div>
                                        <p>Logout</p>
                                    </div>{" "}
                                    <span
                                        style={{
                                            marginLeft: "55px",
                                            marginTop: "-4px",
                                        }}
                                    >
                                        <i className="fa-solid fa-angle-right fa-2xs" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Master;
