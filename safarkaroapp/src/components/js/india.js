// import def from "ajv/dist/vocabularies/applicator/additionalItems";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import '../css/india.css';
import axios from './AxiosInstance.js';



function India() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogIN,setLogIn] = useState(false);
    const [indiaPackages, setIndiaPackages] = useState([]);
    const [loadingIndia, setLoadingIndia] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    const fetchIndiaPackages = async () => {
        try {
          const response = await axios.get('api/packages/india/');
          console.log(response.data)
          setIndiaPackages(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoadingIndia(false);
        }
      };
  
    useEffect(() => {
        fetchIndiaPackages();
        const sessionValue = sessionStorage.getItem('isLogIN');
        // Convert session value to a boolean and set it in the state
        setLogIn(sessionValue === 'true');
       
      }, []);
    const Login_btn=()=>{
        navigate('/login');
      }
    const toggleMenu = () => {
        setIsOpen(!isOpen);

        let sub = document.getElementById("subMenu");
        sub.classList.toggle("open-menu");
    };
    if (loadingIndia) {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh', // Ensure it takes the full height of the viewport
              fontSize: '24px', // Increase the font size
              fontWeight: 'bold' // Optional: Make the font bold
            }}
          >
            Loading...
          </div>
        );
      }
    return (
        <div id="india">
            <div id="header">
                 <img
                    src="/Resources/Domestic.jpg"
                    width="100%"
                    height="400px"
                    style={{ filter: "brightness(-25)" ,objectFit:"revert"}}
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

                                <Link to="/india" className="link nav-link  self-active m-2" >India </Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/international" className="link nav-link  m-2">International</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="link nav-link  m-2">About us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="link nav-link  m-2">Contact us </Link>
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
                <div className="header-title"> Domestic Destinations </div>
                <div className="sub-index">Home &gt; India</div>
            </div>
            





                <div className="grid">
                {indiaPackages.map((pkg, index) => (
                     <div className="responsive">
                     <div className="gallery">
                         <a target="_self" href={`/domestic/${pkg.package_name}`}>
                             <img
                                 src={pkg.img_poster}
                                 alt="Cinque Terre"
                             />
                         </a>
                         <div className="desc">{pkg.package_name}</div>
                     </div>
                 </div>

                  ))
                 
                }





                    {/* <div className="responsive">
                        <div className="gallery">
                            <a target="_self" href="/domestic/kashmir">
                                <img
                                    src="/Resources/kashmir.jpg"
                                    alt="Cinque Terre"
                                />
                            </a>
                            <div className="desc">Kashmir</div>
                        </div>
                    </div> */}
                    {/* <div className="responsive">
                        <div className="gallery">
                            <a target="_self" href="/domestic/Himachal">
                                <img
                                    src="/Resources/himachal.jpg"
                                    alt="Forest"
                                />
                            </a>
                            <div className="desc">Himachal</div>
                        </div>
                    </div>
                    <div className="responsive">
                        <div className="gallery">
                            <a target="_self" href="/domestic/Goa">
                                <img
                                    src="/Resources/goa.jpg"
                                    alt="Northern Lights"
                                />
                            </a>
                            <div className="desc">Goa</div>
                        </div>
                    </div>
                    <div className="responsive">
                        <div className="gallery">
                            <a target="_self" href="/domestic/Kerala">
                                <img
                                    src="/Resources/kerala.jpeg"
                                    alt="Mountains"
                                />
                            </a>
                            <div className="desc">Kerala</div>
                        </div>
                    </div> */}
                    <div className="clearfix" />
                </div>
                <footer>
                    <div id="footer" className="container-fluid bg-dark text-light p-2">
                        <div className="d-flex flex-wrap justify-content-around " id="div2infoot">
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
                                    Request a qoute or just chat about your next vacation. <br /> We're
                                    always happy to help!
                                </span>
                                <br />
                                <i
                                    className="fa-solid fa-phone"
                                    style={{ color: "rgb(255, 109, 30)" }}
                                />{" "}
                                : +91-1800544005 , +91-180059905 <br />
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
                                            <i className="fab fa-facebook-f" style={{ color: "white" }} />
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

export default India;