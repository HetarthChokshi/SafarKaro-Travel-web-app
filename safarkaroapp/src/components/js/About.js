import React, { useState,useEffect } from "react";
import "../css/master.css";
import { Link ,useNavigate} from "react-router-dom";
import "../css/about.css";
import {helmet} from 'react-helmet'

function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogIN,setLogIn] = useState(false);
  useEffect(() => {
         
    const sessionValue = sessionStorage.getItem('isLogIN');
    // Convert session value to a boolean and set it in the state
    setLogIn(sessionValue === 'true');
   
  }, []);
  const navigate=useNavigate();
  const Login_btn=()=>{
    navigate('/login');
  }
  const toggleMenu = () => {
    setIsOpen(!isOpen);

    let sub = document.getElementById("subMenu");
    sub.classList.toggle("open-menu");
  };

  return (
     <>
     <helmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>About | SafarKaro.com</title>
      </helmet>
      <div id="about">
        <header>
          <div id="header">
            <img
              height="400px"
              src="/Resources/about.jpg"
              width="100%"
              style={{ objectFit: "cover" }}
            />
            <div className="path">
              <h1>About Us</h1>
              <p>Home &nbsp;&gt;&nbsp; ABOUT US</p>
            </div>

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
                    <Link to="/" className="link nav-link   m-2">
                      {" "}
                      Home{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/india" className="link nav-link  m-2">
                      India{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/international" className="link nav-link  m-2">
                      International
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="link nav-link self-active m-2">
                      About us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact" className="link nav-link  m-2">
                      Contact us{" "}
                    </Link>
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
                
               {/* end logic  */}
              </div>
            </div>
          </div>
        </header>
        <div className="aboutus-info">
          <div className="container">
            <div className="buidingsection">
              <h3 style={{ fontWeight: "bold" }}>
                Welcome to Safar Karo Travels, Your Gateway to Unforgettable
                Journeys!
              </h3>
              <br />
              <p>
                We, at <b>Safar Karo Travels</b>, are experts in the field of
                travel and tourism industry in India, committed to providing
                best in class service for delivering holidays both pleasant and
                enjoyable.
              </p>
              <p>
                {" "}
                We promise to treat you as our very own family members. We
                believe in transparency and hence we never go wrong in over
                promising or under delivering.
              </p>
              <p>
                We are a trustworthy tour operator company for more than two
                decades now. Your blessings and satisfaction is our ultimate
                profit that matters more than what we earn. We welcome you to
                join us and have the most wonderful time of your life.{" "}
              </p>
              <p>
                We are thankful to Amdavadis for promoting us from Zero to Hero
                (Km).{" "}
              </p>
              <p>
                {" "}
                <strong> – Safar Karo</strong>{" "}
              </p>
            </div>
            <div className="yearsof-success">
              <h4 style={{ fontWeight: "bolder" }}>
                <span>18 Years</span>
              </h4>
              <p>
                Converting Travel Imaginations Of Our Tourists Into Reality!
              </p>
            </div>
            <div
              className="altr-about"
              style={{ marginBottom: 100, margin: "0px 45px" }}
            >
              <div className="row altr-about-row">
                <div className="col-sm-12 col-md-12">
                  <h3>
                    <b>What Sets Us Apart:</b>
                  </h3>
                  <p>
                    <b>Personalized Service:</b> We understand that no two
                    travelers are alike. Our dedicated team takes the time to
                    understand your preferences, ensuring that each itinerary is
                    tailored to suit your individual tastes and interests.
                  </p>
                  <p>
                    {" "}
                    <b>Expert Guidance:</b> Our experienced travel advisors
                    bring a wealth of knowledge about destinations worldwide.
                    Whether you seek cultural immersion, thrilling adventures,
                    or tranquil retreats, we provide expert guidance to create a
                    seamless and unforgettable travel experience.{" "}
                  </p>
                  <p>
                    {" "}
                    <b>Global Network: </b>With a vast network of partners,
                    accommodations, and local experts, we offer access to
                    exclusive amenities, hidden gems, and unique experiences
                    that go beyond the typical tourist path.{" "}
                  </p>
                  <p>
                    {" "}
                    <b>Commitment to Excellence: </b> Our commitment to
                    excellence is reflected in every aspect of our service. From
                    meticulous trip planning to on-the-ground support, we strive
                    for perfection to ensure your journey exceeds expectations.
                  </p>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="row three-colrobox">
                <div className="col-sm-12 col-md-4 whoweare">
                  <h3 style={{ fontWeight: 900 }}>Who We Are</h3>
                  <p>
                    At the heart of Safar Karo Travels is a team of travel
                    enthusiasts, seasoned experts, and destination aficionados.
                    We are united by a common love for adventure, discovery, and
                    the belief that every journey should be as unique as the
                    traveler embarking upon it.
                  </p>
                </div>
                <div className="col-sm-12 col-md-4 whatwe">
                  <h3 style={{ fontWeight: 900 }}>Our Mission</h3>
                  <p>
                    To inspire and enable travelers to explore the world with
                    confidence, fostering a deep appreciation for diverse
                    cultures, landscapes, and the shared human experience. We
                    aim to be the go-to travel partner, creating moments that
                    last a lifetime.
                  </p>
                </div>
                <div className="col-sm-12 col-md-4 webeleve">
                  <h3 style={{ fontWeight: 900 }}>Connect with Us</h3>
                  <p>
                    Join us on this exciting adventure! Follow us on Instagram,
                    Facebook, WhatsApp, Youtube to stay updated on the latest
                    travel trends, destination highlights, and exclusive offers.
                    At Safar Karo Travels, your journey begins with us, but the
                    memories last a lifetime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* Footer */}
        <footer>
          <div id="footer" className="container-fluid bg-dark text-light p-2">
            <div
              className="d-flex flex-wrap justify-content-around "
              id="div2infoot"
            >
              <div>
                <h4 className="footer-heading">Registered Office</h4>
                <span className="footer-text">
                  {" "}
                  9th Floor, The Apparel park <br />
                  Nr. European catalog <br />
                  satellite, Ahmedabad-380015
                </span>
              </div>
              <div>
                <h4 className="footer-heading"> Call us </h4>
                <span className="footer-text">
                  {" "}
                  Request a qoute or just chat about your next vacation. <br />{" "}
                  We're always happy to help!
                </span>
                <br />
                <i
                  className="fa-solid fa-phone"
                  style={{ color: "rgb(255, 109, 30)" }}
                />{" "}
                : +91-1800544005 , +91-180059905
                <br />
                <i
                  className="fa-solid fa-envelope"
                  style={{ color: "rgb(255, 109, 30)" }}
                />{" "}
                : info@safarkaro.com
              </div>
              <div>
                <h4 className="footer-heading">Connect to us</h4>
                <span className="footer-text">
                  {" "}
                  Check out reviews, podcasts and more...
                </span>
                <div className="d-flex justify-content-center flex-nowrap  ">
                  <div className="p-2 faf-icons">
                    <a href="https://www.facebook.com/">
                      <i
                        className="fab fa-facebook-f"
                        style={{ color: "white" }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://www.instagram.com/">
                      <i
                        className="fa-brands fa-instagram"
                        style={{ color: "white" }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://www.youtube.com/">
                      <i
                        className="fa-brands fa-youtube"
                        style={{ color: "white" }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://twitter.com/?lang=en">
                      <i
                        className="fa-brands fa-twitter"
                        style={{ color: "white" }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://in.linkedin.com/">
                      <i
                        className="fa-brands fa-linkedin"
                        style={{ color: "white" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr
              style={{ margin: "20px auto", borderBottom: "2px solid white" }}
            />
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
    </>
  );
}

export default About;
