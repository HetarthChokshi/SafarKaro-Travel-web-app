import "../css/Home.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from './AxiosInstance.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [indiaPackages, setIndiaPackages] = useState([]);
  const [internationalPackages, setInternationalPackages] = useState([]);
  const [loadingIndia, setLoadingIndia] = useState(true);
  const [loadingInter, setLoadingInter] = useState(true);
  const [error, setError] = useState(null);
  const [isLogIN, setLogIn] = useState(false);
  const username=sessionStorage.getItem('username');
  // fetch data from backend
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
  const fetchInternationalPackages = async () => {
    try {
      const response = await axios.get('api/packages/international/');
      console.log(response.data)
      setInternationalPackages(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingInter(false);
    }
  };
  const fetchUserIdByUsername = async () => {
    try {
    
      const response = await axios.post('get-user-id/', { username });
      console.log(response.data)
      const userId = response.data.user_id;
      console.log('User ID:', userId);
      sessionStorage.setItem('user_id',userId)
    } catch (error) {
      console.error('Error fetching user ID:', error);
      
    }
  };
  useEffect(() => {
    fetchIndiaPackages();
    fetchInternationalPackages();
    fetchUserIdByUsername(username);
    // setLogIn(sessionStorage.getItem('isLogIN')); 
    const sessionValue = sessionStorage.getItem('isLogIN');
    // Convert session value to a boolean and set it in the state
    setLogIn(sessionValue === 'true');

  }, []);


  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);

    let sub = document.getElementById("subMenu");
    sub.classList.toggle("open-menu");
  };

  const Login_btn = () => {
    navigate('/login');
  }

  if (loadingIndia || loadingInter) {
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
    <>
      <helmet>
        {/* <head> */}
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>SafarKaro.com</title>
        {/* </head> */}
      </helmet>
      <div id="home">
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

                  <Link to="/india" className="link nav-link   m-2" >India </Link>

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
              {isLogIN ?
                (
                  <>
                  <img
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
                ) : (
                  <button
                    className="btn btn-primary  btn-sm"
                    id="login-btn" onClick={Login_btn}
                  >
                    Login
                  </button>)
              }
            </div>
          </div>
          <div className="header-title">
            <span
              id="header-title-span"
              style={{
                color: "rgb(66, 73, 99)",
                fontSize: "60px",
              }}
            >
              {" "}
              Welcome To
            </span>{" "}
            <span
              style={{
                fontFamily: "'Brush Script MT', cursive",
              }}
            >
              Safar Karo
            </span>
          </div>
          <div className="header-slogan">EXPLORE . DREAM . DISCOVER</div>
        </div>

        {/* indian  */}
        <div className="india-travel text-center p-3">
          <span className="india-text">Discover Top Indian Destinations</span>
          <div id="carouselExample" className="carousel slide">
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 8000 }}
          >
            {indiaPackages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <div className="card" style={{ width: '18rem',borderRadius:'5px'}}>
                  <a href={`/domestic/${pkg.package_name}`}>
                    <img
                      className="card-img-top"
                      src={pkg.img_poster}
                      alt="image"
                    />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title">{pkg.package_name}</h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
          {/* <div className="carousel slide" id="carouselExample" data-bs-interval="8000" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="d-flex justify-content-between  ">
                  <div
                    className="card"
                    id="card-1"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <a href="/domestic">
                      <img
                        className="card-img-top"
                        src="/Resources/kashmir.jpg"
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">Kashmir</h5>
                    </div>
                  </div>
                  <div
                    className="card"
                    id="card-2"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <a href="Himachal.html">
                      <img
                        className="card-img-top"
                        src="/Resources/himachal.jpg"
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">Himachal</h5>
                    </div>
                  </div>
                  <div
                    className="card"
                    id="card-3"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <a href="Goa.html">
                      <img className="card-img-top" src="/Resources/goa.jpg" />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">Goa</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="d-flex justify-content-between  ">
                  <div
                    className="card"
                    id="card-1"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <a href="Himachal.html">
                      <img
                        className="card-img-top"
                        src="/Resources/himachal.jpg"
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">Himachal</h5>
                    </div>
                  </div>
                  <div
                    className="card"
                    id="card-2"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <a href="Goa.html">
                      <img className="card-img-top" src="/Resources/goa.jpg" />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">Goa</h5>
                    </div>
                  </div>
                  <div
                    className="card"
                    id="card-3"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <a href="Kerala.html">
                      <img
                        className="card-img-top"
                        src="/Resources/kerala.jpeg"
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">Kerala</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <button
            className="carousel-control-prev"
            data-bs-slide="prev"
            data-bs-target="#carouselExample"
            type="button"
          >
            <span>
              <i
                className="fa-solid fa-angle-left fa-2xl"
                style={{
                  color: "#000000",
                }}
              />
            </span>
          </button>
          <button
            className="carousel-control-next"
            data-bs-slide="next"
            data-bs-target="#carouselExample"
            type="button"
          >
            <span>
              <i
                className="fa-solid fa-angle-right fa-2xl"
                style={{
                  color: "#000000",
                }}
              />
            </span>
          </button> */}
        </div>

        {/* festivals  */}
        <div className="p-3 festivals">
          <div className="festivals-title">
            Festivals of{" "}
            <span
              style={{
                color: "#ff6d1e",
              }}
            >
              India
            </span>
          </div>
          <br />
          <div className="wrapper">
            <div className="box" id="box1">
              <img loading="lazy" src="/Resources/kite.jpg" />
              <div className="intro">
                <h4 align="left">
                  <span className="festive-heading">
                    Kite festival - 14 Jan'24
                  </span>
                </h4>
                <p>
                  {" "}
                  It is a popular festival in India and it takes place during
                  Makar Sankranti in the month of January.The festival is marked
                  by people flying kites from their terraces and rooftops.
                </p>
              </div>
            </div>
            <div className="box" id="box2">
              <img loading="lazy" src="/Resources/holi.jpg" />
              <div className="intro">
                <h4 align="left">
                  <span className="festive-heading">Holi - 24 Mar'24</span>
                </h4>
                <p>
                  Festival of Colours, Love, and Spring. One of the most vibrant
                  and widely celebrated festivals in India. People come together
                  to play with colors and share the spirit joy.{" "}
                </p>
              </div>
            </div>
            <div className="box" id="box3">
              <img loading="lazy" src="/Resources/Janamashtmi.jpg" />
              <div className="intro">
                <h4 align="left">
                  <span className="festive-heading">Janmastmi - 14 Aug'24</span>
                </h4>
                <p>
                  Janmashtami is a Hindu festival that celebrates the birth of
                  Krishna, the eighth avatar of Vishnu. He is seen as a symbol
                  of divinity, love, and righteousness.{" "}
                </p>
              </div>
            </div>
            <div className="box" id="box4">
              <img loading="lazy" src="/Resources/ganesh.jpg" />
              <div className="intro">
                <h4 align="left">
                  <span className="festive-heading">
                    Ganesh Chaturthi - 15 Sep'24
                  </span>
                </h4>
                <p>
                  Ganesh Chaturthi, also known as Vinayaka Chaturthi, is one of
                  the most celebrated festivals of the Hindus that marks the
                  birth of Lord Ganesha.{" "}
                </p>
              </div>
            </div>
            <div className="box" id="box5">
              <img loading="lazy" src="/Resources/navratri.jpeg" />
              <div className="intro">
                <h4 align="left">
                  <span className="festive-heading">Navratri - 10 Oct'24</span>
                </h4>
                <p>
                  Garba is a ritualistic and devotional dance that is performed
                  on the occasion of the Hindu festival of Navaratri. It is
                  performed in circle and counter-clockwise direction.
                </p>
              </div>
            </div>
            <div className="box" id="box6">
              <img loading="lazy" src="/Resources/diwali.jpg" />
              <div className="intro">
                <h4 align="left">
                  <span className="festive-heading">Diwali - 1 Nov'24</span>
                </h4>
                <p>
                  Diwali is Festival of lighs which glorifies victory of light
                  over darkness, good over evil and knowledge over ignorance.
                  People celebrate with lighting diyas, crackers and doing
                  rituals
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* international  */}
        <div className="international">
          <h1
            align="center"
            style={{
              paddingTop: "20px",
            }}
          >
            Top International Destinations
          </h1>
          <div className="d-flex flex-wrap p-10 mt-4 justify-content-center">
            {
              internationalPackages.map((pkg) => {

                return (
                  <div
                    className="card"
                    style={{
                      marginRight: "30px",
                      width: "18rem",
                    }}
                  >
                    <img
                      className="card-img"
                      loading="lazy"
                      src={pkg.img_poster}
                      style={{
                        aspectRatio: "2/2 !important",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pkg.package_name}</h5>
                      <p className="card-text">
                        {pkg.description}
                      </p>
                      <a className="btn" href={`/international/${pkg.package_name}`}>
                        Explore
                      </a>
                    </div>
                  </div>
                )

              })
            }
          </div>
        </div>

        {/* reviews  */}
        <div className="testimonial">
          <div className="d-flex flex-wrap p-2 justify-content-center ">
            <div id="test-text">
              <h1
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                Testimonials
              </h1>
              <p>
                At Safar Karo, the satisfaction and joy of our travelers are at
                the core of everything we do. Here's what some of our valued
                clients have shared about their experience with us.
              </p>
            </div>
            <div className="reviews d-flex flex-nowrap ">
              <div
                className="carousel slide"
                data-bs-ride="carousel"
                id="carouselExampleSlidesOnly"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div>
                      <img src="/Resources/boy2_icon.png" />
                    </div>
                    <div id="reviews-div">
                      <h3>Utsav Seghal</h3>
                      <p>
                        <span>
                          <sup>
                            <i className="fa-solid fa-quote-left fa-lg"></i>
                          </sup>
                        </span>
                        It's very greatful experience to use your facilities and
                        services, we had completed our trip, my family and I
                        also enjyed on this trip arranged by safar karo team and
                        management person, so at the end of our trip a big thank
                        you harsh and saumil.
                        <span>
                          <sup>
                            <i className="fa-solid fa-quote-right fa-lg" />
                          </sup>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div>
                      <img src="/Resources/women2_icon.png" />
                    </div>
                    <div id="reviews-div">
                      <h3>Purvi Chokshi</h3>
                      <p>
                        <span>
                          <sup>
                            <i className="fa-solid fa-quote-left fa-lg"></i>
                          </sup>
                        </span>
                        very good experience at safar karo travel. Manager
                        Hetarth is really very good in nature and polite.Best
                        manager.Thank you safar karo , our tour was awesome and
                        enjoyed a lot in Dubai tour.I recommend safar karo to
                        all.
                        <span>
                          <sup>
                            <i className="fa-solid fa-quote-right fa-lg" />
                          </sup>
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div>
                      <img src="/Resources/boy2_icon.png" />
                    </div>
                    <div id="reviews-div">
                      <h3>Kautilya Ranpura</h3>
                      <p>
                        <span>
                          <sup>
                            <i className="fa-solid fa-quote-left fa-lg"></i>
                          </sup>
                        </span>
                        My recent Himachal trip with safar karo was indeed a
                        memorable experience. Trip was very perfectly planned
                        and executed.special thanks to all tour managers-Hetarth
                        and nikhil for their clear guidance and time management.
                        Food and stay were up to the mark and faboulus.Would
                        like to go again with them on my next trip.
                        <span>
                          <sup>
                            <i className="fa-solid fa-quote-right fa-lg" />
                          </sup>
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="container-fluid bg-dark text-light p-2" id="footer">
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
                  Request a qoute or just chat about your next vacation. <br />
                  We're always happy to help!
                </span>
                <br />
                <i
                  className="fa-solid fa-phone"
                  style={{
                    color: "rgb(255, 109, 30)",
                  }}
                />{" "}
                : +91-1800544005 , +91-180059905
                <br />
                <i
                  className="fa-solid fa-envelope"
                  style={{
                    color: "rgb(255, 109, 30)",
                  }}
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
                        style={{
                          color: "white",
                        }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://www.instagram.com/">
                      <i
                        className="fa-brands fa-instagram"
                        style={{
                          color: "white",
                        }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://www.youtube.com/">
                      <i
                        className="fa-brands fa-youtube"
                        style={{
                          color: "white",
                        }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://twitter.com/?lang=en">
                      <i
                        className="fa-brands fa-twitter"
                        style={{
                          color: "white",
                        }}
                      />
                    </a>
                  </div>
                  <div className="p-2 faf-icons">
                    <a href="https://in.linkedin.com/">
                      <i
                        className="fa-brands fa-linkedin"
                        style={{
                          color: "white",
                        }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr
              style={{
                borderBottom: "2px solid white",
                margin: "20px auto",
              }}
            />
            <div className="logo-footer">
              <img
                height="150px"
                src="/Resources/safar_logo_crop.png"
                style={{
                  borderRadius: "50%",
                }}
                width="150px"
              />
            </div>
            <div id="con_in_foot">
              Safar Karo ©Copyright 2024-All rights reserved. |{" "}
              <span
                style={{
                  color: "blue",
                }}
              >
                Designed by Hetarth
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
