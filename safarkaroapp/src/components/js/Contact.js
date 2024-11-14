import "../css/contact.css";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";


function Contact() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogIN,setLogIn] = useState(false);
    const navigate=useNavigate();
    const Login_btn=()=>{
        navigate('/login');
      }
    const toggleMenu = () => {
        setIsOpen(!isOpen);

        let sub = document.getElementById("subMenu");
        sub.classList.toggle("open-menu");
    };
    useEffect(() => {
         
        const sessionValue = sessionStorage.getItem('isLogIN');
        // Convert session value to a boolean and set it in the state
        setLogIn(sessionValue === 'true');
       
      }, []);
    return (
        <div id="contact">
            <div id="header">
                <img
                    src="/Resources/contact.jpg"
                    width="100%"
                    height="400px"
                    style={{ objectFit: "cover" }}
                />

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

                                <Link to="/" className="link nav-link   m-2" > Home </Link>
                            </li>
                            <li className="nav-item">

                                <Link to="/india" className="link nav-link  m-2" >India </Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/international" className="link nav-link  m-2">International</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="link nav-link  m-2">About us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="link nav-link self-active m-2">Contact us </Link>
                            </li>
                        </ul>
                       {/* login logic  */}
                       {isLogIN ? 
                (
              <><img
                    className="profile-pic"
                    id="profile"
                    onClick={toggleMenu}
                    src="/Resources/user.jpeg" /><i
                      className="fa-solid fa-caret-down"
                      onClick={toggleMenu}
                      style={{
                        color: "rgba(0, 0, 0, 0.92)",
                        cursor: "pointer",
                        marginLeft: "0px",
                      }} /><div className="sub-menu-wrap" id="subMenu">
                      <div className="sub-menu">
                        <div className="user-info">
                          <div>
                            <img src="/Resources/user3.jpeg" />
                            <h4>{sessionStorage.getItem('username')}</h4>
                          </div>
                          <hr />

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
                                <Link to="/bookings" className="link" style={{ color: '#525252' }}> Bookings</Link>{" "}
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
                              <p> <Link to="/logout" className="link" style={{ color: '#525252' }}> Logout</Link></p>
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
                    </div></>
                ): (
                  <button
                    className="btn btn-primary  btn-sm"
                    id="login-btn" onClick={Login_btn}
                  >
                    Login
                  </button>)
                  }
                        {/* end  */}
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center flex-wrap mt-5" id="formdiv">
                <div className="form">
                    <h1>
                        Love to hear from you,
                        <br /> Get in touch
                    </h1>
                    <form action="/thankyou" method="">
                        <div className="mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="text"
                                id="text"
                                placeholder="Your Full Name"
                                required=""
                            />
                        </div>
                        <div className="mt-3">
                            {" "}
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email Address"
                                name="email"
                                required=""
                            />
                        </div>
                        <div className="mt-3">
                            <input
                                type="text"
                                min={10}
                                max={10}
                                className="form-control"
                                name="Mobile"
                                id="Mobile"
                                placeholder="Mobile Number"
                                required=""
                            />
                        </div>
                        <div className="mt-3">
                            <textarea
                                className="form-control"
                                rows={5}
                                cols={80}
                                id="message"
                                name="message"
                                required=""
                                placeholder="Write your message here..."
                                defaultValue={""}
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="submit"
                                className="btn btn-primary btn-submit"
                                defaultValue="Send"
                            />
                        </div>
                    </form>
                </div>
                <div className="contact-content">
                    <h4 className="footer-heading">Registered Office</h4>
                    <p className="footer-text">
                        9th Floor, The Apparel park <br />
                        Nr. European catalog <br />
                        satellite, Ahmedabad-380015
                    </p>
                    <h4 className="footer-heading"> Call us </h4>
                    <p className="footer-text">
                        Request a qoute or just chat about your next vacation.
                        <br /> We're always happy to help!
                        <br />
                        <i className="fa-solid fa-phone" style={{ color: "black" }} /> :
                        +91-1800544005 , +91-180059905 <br />
                        <i
                            className="fa-solid fa-envelope"
                            style={{ color: "rgb(8, 8, 8)" }}
                        />{" "}
                        : info@safarkaro.com
                    </p>
                    <h4 className="footer-heading">Write to us</h4>
                    <p className="footer-text">
                        Be it an enquiry, feedback or a simple suggestion, write to us.
                        <br />
                        info@safarkaro.com
                    </p>
                    <br />
                    <p className="connect">
                        <strong>Connect with us:</strong> &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.facebook.com/">
                            <i className="fab fa-facebook-f" style={{ color: "rgb(0, 0, 0)" }} />
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://twitter.com/?lang=en">
                            <i className="fa-brands fa-twitter" style={{ color: "black" }} />
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://in.linkedin.com/">
                            <i className="fa-brands fa-linkedin" style={{ color: "black" }} />
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://www.youtube.com/">
                            <i className="fa-brands fa-youtube" style={{ color: "black" }} />
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://www.instagram.com/">
                            <i
                                className="fa-brands fa-instagram"
                                style={{ color: "rgb(0, 0, 0)" }}
                            />
                        </a>
                    </p>
                </div>
            </div>
            <br />
            <br />
            <br />
            <h1 style={{ fontFamily: '"Poppins"' }} align="center">
                Our Branches
            </h1>
            <div className="row ">
                <div className="branch  col-sm" style={{ marginLeft: 50 }} id="firstB">
                    <h5 align="center">Ahmedabad Branch</h5>
                    <p>
                        9th Floor, The Apparel park, Nr. European catalog, satellite,
                        Ahmedabad-380015
                        <br />
                        <span style={{ color: "rgb(255, 115, 0)" }}>90333 96799</span>
                    </p>
                </div>
                <div className="branch col-sm ">
                    <h5 align="center">Baroda Branch</h5>
                    <p>
                        424, Trivia Complex, Natubhai Circle, Race Course, Alkapuri, Vadodara
                        <br />
                        <span style={{ color: "rgb(255, 115, 0)" }}>93282 96877</span>
                    </p>
                </div>
                <div className="branch col-sm ">
                    <h5 align="center">Rajkot Branch</h5>
                    <p>
                        Shop No: 104, 1st Floor, Cosmo Complex, Kalavad Road,Kishan Para,
                        Rajkot-360001
                        <br />
                        <span style={{ color: "rgb(255, 115, 0)" }}>84879 80414</span>
                    </p>
                </div>
                <div className="branch col-sm " style={{ marginRight: 50 }} id="lastB">
                    <h5 align="center">Surat Branch</h5>
                    <p>
                        108,Sai Square Complex, Nr. Honey park Society, Adajan, Surat-09.
                        <br />
                        <span style={{ color: "rgb(255, 115, 0)" }}>90819 55433</span>
                    </p>
                </div>
            </div>
            <br />
            <br />
            <br />
            {/* Footer  */}
            <footer>
                <div id="footer" className="container-fluid bg-dark text-light p-2">
                    <hr style={{ margin: "20px auto", borderBottom: "2px solid white" }} />
                    <div className="logo-footer">
                        <img
                            src="/Resources/safar_logo_crop.png"
                            width="150px"
                            height="150px"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                    <div id="con_in_foot">
                        Safar Karo ©Copyright 2024-All rights reserved. |{" "}
                        <span style={{ color: "blue" }}>Designed by Hetarth</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}


export default Contact;