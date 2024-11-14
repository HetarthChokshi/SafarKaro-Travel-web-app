import "../css/kashmir.css";
import React, { useState,useEffect } from "react";
import { Link,useNavigate,useParams  } from "react-router-dom";
import axios from './AxiosInstance.js';

function InterTour() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogIN,setLogIn] = useState(false); 
    const [packageInfo,setPackageInfo] = useState(''); 
    const [loading,setLoading] = useState(''); 
    const [error,setError] = useState(''); 
    const [div1,setDiv1]=useState([]);
    const [div2,setDiv2]=useState([]);
    const [itinerary,setITI]=useState([]);
    const {destination} = useParams();
    sessionStorage.setItem('destination',destination);
    sessionStorage.setItem('packagePrice',packageInfo.price);
    const navigate=useNavigate();

   

    const parseString=(jsonString)=>{
        let newJson={}
        jsonString.highlights=JSON.parse(jsonString.highlights);
        // jsonString.dates=JSON.parse(jsonString.dates);
        jsonString.itinerary=JSON.parse(jsonString.itinerary);
        setDiv1(jsonString.highlights.div1);
        setDiv2(jsonString.highlights.div2);
        setITI(jsonString.itinerary);
        console.log(itinerary)
        return jsonString;
    }

    const fetchPackage = async () => {
        try {
          const response = await axios.get(`api/international/${destination}`);
          console.log(response.data)
          let data=parseString(response.data);
          console.log(data);
          setPackageInfo(data);     
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }; 
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        let sub = document.getElementById("subMenu");
        sub.classList.toggle("open-menu");  
    };
    const Login_btn=()=>{
        navigate('/login');
      }
    const change = (id) => {
        const element = document.getElementById(id);
        element.style.backgroundColor = "white";
        element.style.borderLeftWidth = "4px";
        element.style.borderColor = "orange";
        element.style.color = "var(--orange) ";
    };

    const reset = (id) => {
        const element = document.getElementById(id);
        element.style.color = "black";
        element.style.backgroundColor = "var(--blue)";
    };
    const handlechange=(e)=>{
        sessionStorage.setItem('no_of_travellers',e.target.value)
    }
    useEffect(() => {   
        fetchPackage();
        const sessionValue = sessionStorage.getItem('isLogIN');
        // Convert session value to a boolean and set it in the state
        setLogIn(sessionValue === 'true');   
      }, []);
     
     
        
      
       
      
    
      
    
     
    return (
        <div id="indtour" >
            <div id="header">
            
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

                                <Link to="/" className="link nav-link  link-login m-2" > Home </Link>
                            </li>
                            <li className="nav-item">

                                <Link to="/india" className="link nav-link  link-login m-2" >India </Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/international" className="link nav-link  link-login m-2">International</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="link nav-link text-light link-login    m-2">About us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="link nav-link text-light link-login m-2">Contact us </Link>
                            </li>
                        </ul>
                     {/* login logic */}
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
                            <h4>Hetarth Chokshi</h4>
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

            {/* body */}
            
                <div className="path">Home &gt; {packageInfo.destination} Tour Package</div>
                <h2 className="title"> {packageInfo.destination} Tour Package</h2>
                <div className="d-flex text-center" style={{ marginLeft: 20 }}>
                    <div className="days1">{packageInfo?.days || 'No Name Available'} Days</div>
                    <div className="days2">{packageInfo.nights} Nights</div>
                </div>
                <br /> <br />
               
                {/* Main Div  */}
                <div className="d-flex flex-wrap ">
                    <div className="slide">
                        <img src={packageInfo.img_path}   style={{objectFit:'cover'}} width="1000px" height="550px"/>
                        <br />
                        <br />
                        {/* Inner child div-1  */}
                        <div
                            className="d-flex flex-wrap justify-content-between"
                            style={{ paddingLeft: 20 }}
                            id="inner-div-1"
                        >
                            <div>
                                <h4 style={{ fontFamily: '"Poppins"', fontWeight: 700 }}>
                                    Package Highlights
                                </h4>
                               
                                {
                                  
                                    div1.map((highlight)=>{
                                        return(
                                        <p id="checklist">
                                        <i className="fa-solid fa-check " />
                                        &nbsp; {highlight}<br />
                                        </p>
                                        )
                                    })
                                }
                               
                            </div>
                            <div style={{ paddingTop: 40 }}>
                            {
                                  
                                  div2.map((highlight)=>{
                                      return(
                                      <p id="checklist">
                                      <i className="fa-solid fa-check " />
                                      &nbsp; {highlight}<br />
                                      </p>
                                      )
                                  })
                              }
                            </div>
                            <div>
                                <h4 style={{ fontFamily: '"Poppins"', fontWeight: 700 }}>
                                    Package Includes
                                </h4>
                                <div className="d-flex ">
                                    <div className="icon-box">
                                        <div className="icon">
                                            <i className="fa-solid fa-mug-saucer fa-xl" /> <br />
                                            Meals
                                        </div>
                                    </div>
                                    <div className="icon-box">
                                        <div className="icon">
                                            <i className="fa-solid fa-hotel fa-xl" />
                                            <br />
                                            Hotels
                                        </div>
                                    </div>
                                    <div className="icon-box">
                                        <div className="icon">
                                            <i className="fa-solid fa-camera fa-xl" /> <br />
                                            Sightseeing
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        <br />
                        <br />
                        <br />
                        {/* Vertical menu  */}
                        <div
                            className="d-flex "
                            style={{
                                border: "0.5px solid  rgba(128, 128, 128, 0.132)",
                                borderLeft: 0
                            }}
                            id="verticalMenu"
                        >
                            <div
                                className="nav flex-column nav-pills me-3 "
                                id="v-tab"
                                role="tablist"
                            >
                                <br />
                                <button
                                    className="nav-link   "
                                    id="v-btn1"
                                    data-bs-toggle="tab"
                                    data-bs-target="#overview"
                                    type="button"
                                    role="tab"
                                    onClick={()=> change('v-btn1')}
                                    onBlur={()=> reset('v-btn1')}
                                >
                                    Overview
                                </button>
                                <br />
                                <button
                                    className="nav-link active  "
                                    id="v-btn2"
                                    data-bs-toggle="tab"
                                    data-bs-target="#itinerary"
                                    type="button"
                                    role="tab"
                                    onClick={()=> change('v-btn2')}
                                    onBlur={()=> reset('v-btn2')}
                                >
                                    Itinerary
                                </button>
                                <br />
                                <button
                                    className="nav-link"
                                    id="v-btn3"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tourdates"
                                    type="button"
                                    role="tab"
                                    onClick={()=>change('v-btn3')}
                                    onBlur={()=> reset('v-btn3')}
                                >
                                    Tour Dates
                                </button>
                                <br />
                                <button
                                    className="nav-link "
                                    id="v-btn4"
                                    data-bs-toggle="tab"
                                    data-bs-target="#includes"
                                    type="button"
                                    role="tab"
                                    onClick={()=> change('v-btn4')}
                                    onBlur={()=> reset('v-btn4')}
                                >
                                    Inclusions /Exclusions
                                </button>
                                <br />
                                <button
                                    className="nav-link"
                                    id="v-btn5"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tourinfo"
                                    type="button"
                                    role="tab"
                                    onClick={()=> change('v-btn5')}
                                    onBlur={()=> reset('v-btn5')}
                                >
                                    Tour Information
                                </button>
                                <br />
                                <button
                                    className="nav-link"
                                    id="v-btn6"
                                    data-bs-toggle="tab"
                                    data-bs-target="#cancel"
                                    type="button"
                                    role="tab"
                                    onClick={()=> change('v-btn6')}
                                    onBlur={()=> reset('v-btn6')}
                                >
                                    Cancellation Policy
                                </button>
                                <br />
                            </div>
                            {/* Tab contents */}
                            <div className="tab-content" id="tabContent">
                                {/* overview */}
                                <div className="tab-pane fade " id="overview" style={{color:'black !important'}}>
                                    <p>
                                      {packageInfo.overview}
                                    </p>
                                </div>
                                {/* itinerary */}
                                <div className="tab-pane fade show active " id="itinerary">
                                    <h6 style={{ fontWeight: "bold", letterSpacing: 1 }} align="left">
                                        ITINERARY{" "}
                                    </h6>
                                    <br />
                                    <div id="tour_plan" style={{ whiteSpace: '' }}  >
                                       {itinerary.map((iti,index)=>{
                                        return (
                                            <div key={index}>
                                                {iti}
                                            </div>
                                        )
                                       })
                                       
                                       
                                       }

                                    </div>
                                </div>
                                {/* tourdates */}
                                <div className="tab-pane fade" id="tourdates">
                                    <div id="dates" style={{ float: "left" }}>
                                        <h6 style={{ fontWeight: "bold" }} align="center">
                                            March{" "}
                                        </h6>
                                        <ul type="disc">
                                            <li>24/03/2024</li>
                                            <li>30/03/2024</li>
                                            <li>02/04/2024</li>
                                        </ul>
                                    </div>
                                    <div style={{ float: "left" }} id="dates">
                                        <h6 style={{ fontWeight: "bold" }} align="center">
                                            April{" "}
                                        </h6>
                                        <ul type="disc">
                                            <li>16/04/2024</li>
                                            <li>22/04/2024</li>
                                            <li>26/04/2024</li>
                                        </ul>
                                    </div>
                                    <div id="dates" style={{ float: "left" }}>
                                        <h6 style={{ fontWeight: "bold" }} align="center">
                                            September{" "}
                                        </h6>
                                        <ul type="disc">
                                            <li>08/09/2024</li>
                                            <li>15/09/2024</li>
                                            <li>25/09/2024</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* includes / exclusions  */}
                                <div className="tab-pane fade" id="includes">
                                    <h6 style={{ fontWeight: "bold" }} align="center">
                                        Inclusions{" "}
                                    </h6>
                                    <ul type="disc">
                                        <li>
                                            Accommodation on twin sharing basis in above mentioned or
                                            similar
                                            <br /> category hotels, will be confirm at the time of booking.
                                        </li>
                                        <li>
                                            Meals: Daily buffet breakfast and Dinner in hotels restaurant.(
                                            4 Breakfast &amp; <br />4 Dinner Only / no Pack food ).
                                        </li>
                                        <li>
                                            Complimentary use of the hotels any recreation facility as per
                                            hotels terms &amp;
                                            <br />
                                            conditions. (subject to availability).
                                        </li>
                                        <li>
                                            Vehicle cost is including all fuel charges, Driver allowance,
                                            Border tax,
                                            <br />
                                            Toll Tax, Parking and entry charges which is applicable as on
                                            day of quotation.
                                        </li>
                                        <li>Maximum 1 Extra bed can be accommodating in each room.</li>
                                    </ul>
                                    <br />
                                    <h6 style={{ fontWeight: "bold" }} align="center" id="exclude">
                                        Exclusions{" "}
                                    </h6>
                                    <ul type="disc">
                                        <li>
                                            Any Airfare / Train fare is not included in the package cost.
                                        </li>
                                        <li>
                                            Pony/horse rides, boat rides, safaris, rafting charges,
                                            skiing/skating, and cable
                                            <br />
                                            car/ropeway rides etc.,
                                        </li>
                                        <li>
                                            Any expenses of personal nature like tips, phone calls, fax,
                                            internet, games, sauna,
                                            <br />
                                            and steam, Jacuzzi, laundry, extra vehicle hire, bar,room
                                            heaters, discotheque or
                                            <br />
                                            any other.
                                        </li>
                                        <li>
                                            Extra food or beverages ordered or taken in hotel restaurant or
                                            room except buffet
                                            <br />
                                            meal plan.
                                        </li>
                                        <li>
                                            Additional sightseeing tours and excursions. All major
                                            sightseeing will be cover once
                                            <br />
                                            during sightseeing.
                                        </li>
                                        <li>
                                            Vehicle will be allowed up to parking points &amp; last possible
                                            points. (Subject to road &amp;
                                            <br />
                                            gov. conditions).
                                        </li>
                                    </ul>
                                </div>
                                {/* tourinfo */}
                                <div className="tab-pane fade" id="tourinfo">
                                    <h6 style={{ fontWeight: "bold" }}>Note :</h6>
                                    <ul type="disc">
                                        <li>
                                            If you require any other hotel / resort of your choice rather
                                            then mention above <br />
                                            options, you can mail us with your choice of hotels, as we are
                                            dealing in most of
                                            <br /> the hotels in this sector we can provide you the
                                            quotation accordingly.
                                        </li>
                                    </ul>
                                    <h6 style={{ fontWeight: "bold" }}>
                                        Vehicle Available For This Itinerary :
                                    </h6>
                                    <ul type="disc">
                                        <li>
                                            2 Person ( Including Child) - Non A/c - Etios / Indigo / Swift
                                            Dezire.
                                        </li>
                                        <li>4 Person ( Including Child) - Non A/c - Tavera.</li>
                                        <li>6 Person ( Including Child) - Non A/c - Innova / Zylo.</li>
                                        <li>
                                            Above 7 Person (Including Child) -BY TEMPO TRAVELLER / WINGER /
                                            BUS Non A/C <br />
                                            (Sharing with Other Family from Srinagar Airport to Srinagar
                                            Airport Dropping)
                                        </li>
                                        <li>
                                            You are requested to book the vehicle as per number of passanger
                                            including
                                            <br /> child to avoid any uncomfortable journey during the
                                            entire itinerary.
                                        </li>
                                    </ul>
                                </div>
                                {/* Cancellation Policy */}
                                <div className="tab-pane fade" id="cancel">
                                    <h6 style={{ fontWeight: "bold" }}>Cancellation Policy :</h6>
                                    <ul type="disc">
                                        <li>
                                            Cancellation charge will be accept from the booking dates.
                                        </li>
                                        <li>
                                            Before 30 days - communication charges of Rs. 2000/- per person.
                                        </li>
                                        <li>30 -15 Days prior to departure 25% on total package cost.</li>
                                        <li>14 -07 Days prior to departure 50% on total package cost.</li>
                                        <li>07- 03 Days prior to departure 75% on total package cost</li>
                                        <li>With in 03 Days/No show Full amount / non refundable.</li>
                                        <li>
                                            This is our cancellation rules but we will give our best
                                            possible effort to minimize
                                            <br />
                                            the cancellation charges.
                                        </li>
                                    </ul>
                                    <h6 style={{ fontWeight: "bold" }}>Payment Terms :</h6>
                                    <ul type="disc">
                                        <li>Booking amount - 100% Advance for Ticket booking.</li>
                                        <li>
                                            Booking amount - 25% of total package at the time of booking
                                        </li>
                                        <li>
                                            Balance payment of 75% of total package cost to be clear before
                                            20 days prior of the
                                            <br />
                                            departure date.
                                        </li>
                                        <li>
                                            Those booking are made on short notice; all payment must be
                                            clear within 2 to 3 days.
                                        </li>
                                        <li>
                                            Those booking are made on spot check in; all payment must be
                                            made at the time of
                                            <br />
                                            booking only.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Enquiry Form  */}
                    <div style={{ marginLeft: 65, marginTop: 100 }} id="EnquiryForm">
                        <div className="form-heading">Discover the world with us... </div>
                        <div className="form">
                            <form
                                action="/bookingInternational"
                                
                              
                            >
                                <div style={{ paddingTop: 10 }}>
                                    <span className="field-text">Travellers </span>
                                    <br />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="no_of_travellers"
                                        id="text"
                                        placeholder="Enter no of Travellers"
                                        min="1"
                                        step="1"
                                        required
                                        onChange={(e)=>handlechange(e)}
                                    />
                                </div>
                             
                                <div className="price">
                                    <h6 align="center" className="price-content-1">
                                        SUPER DEAL PRICE
                                    </h6>
                                    <h4 align="center" className="price-content-2">
                                        <i className="fa-solid fa-indian-rupee-sign fa-sm" />
                                       {packageInfo.price}
                                    </h4>
                                    <h6 align="center" className="price-content-3">
                                        PER PERSON
                                    </h6>
                                </div>
                                <div
                                    className="mt-3"
                                    style={{ paddingLeft: 20, paddingTop: 25 }}
                                    id="btn-form"
                                >
                                
                                    <button type="submit" className="btn btn-primary btn-primary-custom" id="enquire">Book now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                {/* Footer */}
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

export default InterTour;