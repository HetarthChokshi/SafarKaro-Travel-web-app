import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import "../css/payment.css"
// import { FormData } from './BookingForm';
// import { FormDataInter } from './BookingInter';
import axios from './AxiosInstance';

function Payment() {
    let adults = 0;
    let children = 0;
    let GST = 0;
    let packagePrice = parseFloat(sessionStorage.getItem('packagePrice'));
    let total = 0;
    GST = 0.18 * packagePrice;

    const no_of_travellers=sessionStorage.getItem('no_of_travellers');
    const destination=sessionStorage.getItem('destination');
    const username=sessionStorage.getItem('user_id');
    const username_name=sessionStorage.getItem('username');
    if(!username_name){
        alert("PLease Login !");
        navigate("/");
    }
    
    let tour="";
    let travel_date="2024-09-23"
    let booking_id=0;
    let name="";
    let age=0;
    let email=""
    let mobile=0
    let country=""
    let pancard=""
    let passportNO=""
    let issueDate=""
    let persons=[];

    const [creditCard, setCreditCard] = useState("");
    const[BookingRefID,setBooking]=useState("");
    const navigate=useNavigate();
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        let cardNo = extractLastFourDigits(e.target.value);
        setCreditCard(cardNo);
        console.log(creditCard);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('required-input'); // Select all inputs with class 'required-input'
  
        for (let input of inputs) {
          if (!input.value.trim()) {
            alert(`${input.name} is empty. Please fill it in.`);
            return; // Stop the function if any field is empty
          }
        }
        createBooking().then(()=>{
            createPayment();
            insert_person();

        })
       
        console.log(creditCard);
        alert("Payment successful !");
        navigate("/thanks");
      
    }
    // array of persons with details .
    const processFormDataArray = (formDataArray) => {
        return formDataArray
          .filter(formData => formData.age > 10) // Filter out persons with age 10 or less
          .map(formData => {
            // Create a new object with only the fields that are present
            const processedData = {};
            
            if (formData.name) processedData.name = formData.name;
            if (formData.age) processedData.age = formData.age;
            if (formData.email) processedData.email = formData.email;
            if (formData.country) processedData.country = formData.country;
            if (formData.issueDate) processedData.issueDate = formData.issueDate;
            if (formData.mobile) processedData.mobile = formData.mobile;
            if (formData.pancard) processedData.pancard = formData.pancard;
            if (formData.passportNO) processedData.passportNO = formData.passportNO;
            
            return processedData;
          });
      };

    function generateBookingID() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";

        // Generate the first two random uppercase letters
        let bookingId="";
        for (let i = 0; i < 2; i++) {
            bookingId += letters[Math.floor(Math.random() * letters.length)];
        }

        // Generate the next eight random digits
        for (let i = 0; i < 8; i++) {
           bookingId += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return bookingId
         // Return the 10-character booking ID
    }
    const checkBookingID = async (newBookingID) => {
        try {
          const response = await axios.get(`api/check-booking-id/${newBookingID}/`);
          return !response.data.exists; // If it exists, return false (invalid)
        } catch (error) {
          console.error('Error checking booking ID:', error);
          return false; // In case of error, consider ID invalid
        }
      };

    useEffect(()=>{
        const generateAndCheckID = async () => {
            let valid = false;
            let newBookingID = '';
      
            while (!valid) {
              newBookingID = generateBookingID();
              valid = await checkBookingID(newBookingID);
            }
      
            setBooking(newBookingID);
            console.log(BookingRefID);
          };
      
          generateAndCheckID(); 
        
    },[])
   
    function extractLastFourDigits(cardNumber) {
        // Convert the input to a string (in case it's not already)
        const cardStr = cardNumber.toString();

        // Extract the last 4 digits
        const lastFourDigits = cardStr.slice(-4);

        return lastFourDigits;
    }

    const countChildrenAndAdults = (peopleList) => {
        // Iterate over the list of people
        if (peopleList && Array.isArray(peopleList)) {
            peopleList.forEach((person) => {
                if (person.age <= 10) {
                    children += 1;
                } else {
                    adults += 1;
                }
            });
          } else {
            console.error('peopleList is either undefined or not an array:', peopleList);
          }
      
    };

 
    if (sessionStorage.getItem('Booking')===true) {
       
        let FormData = JSON.parse(sessionStorage.getItem('formData'));
        console.log("dom")
        console.log(FormData);
        if (FormData && FormData.length > 0) {
            countChildrenAndAdults(FormData);
            console.log("inter",adults)
            tour = FormData[0]?.tour || "";  // Use optional chaining and provide a default value
            travel_date = FormData[0]?.travelDate || "";  // Default value if travelDate is missing
            persons = processFormDataArray(FormData);
        }
    } else {
      
        let FormDataInter = JSON.parse(sessionStorage.getItem('formDataInter'));
        console.log(FormDataInter);
        if (FormDataInter && FormDataInter.length > 0) {
            countChildrenAndAdults(FormDataInter);
            console.log("inter",adults)
            tour = FormDataInter[0]?.tour || "";  // Use optional chaining and default value
            travel_date = FormDataInter[0]?.travelDate || "";  // Default value
            persons = processFormDataArray(FormDataInter);
        }
    }
    
    total = GST + adults * packagePrice;

    // send data 
    const createBooking = async () => {
        try {
            const response = await axios.post(`api/bookings/`, {
            booking_id:BookingRefID,
            destination:destination,
            no_of_travellers:no_of_travellers,
            username:username,
            travel_date,
            tour,
        }
          );
          
          booking_id=response.data.booking_id 
          console.log(booking_id)
         // Return the data received from the backend
        } catch (error) {
          console.error('Error creating booking:', error);
        }
      };

    const createTraveller = async (travellerData) => {
        try {
          travellerData.booking_id=booking_id;
          const response = await axios.post(`api/travellers/`,travellerData);
          console.log(response.data); // Return the data received from the backend
        } catch (error) {
          console.error('Error creating traveller:', error);
        }
      };

    const createPayment = async () => {
        try {
          // Make POST request to the API
          const response = await axios.post("api/payment/", {
            username,
            amount:total,
            credit:creditCard,
            booking_id
          });
          
          // Handle successful response
          console.log('Payment submitted successfully:', response.data);
          
        } catch (error) {
          // Handle error
          console.error('Error submitting payment:', error.response ? error.response.data : error.message);
        }
      };

    const insert_person=()=>{
        persons.map(person=>{
            createTraveller(person);
        });
        console.log("done inserting !")       
    }

    return (
        <div id="main">
            <form onSubmit={handleSubmit} action="/thanks" >
                <div id="payment" className="container bg-light d-md-flex align-items-center paddingCustom">
                    <div className="card box1 shadow-sm p-md-5 p-md-5 p-4">
                        <div className="fw-bolder mb-4">
                            <span className="ps-1" >Welcome {username_name} ! <br/></span>
                            <span className="ps-1">Summary</span>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center justify-content-between text">
                                <span className="">Adults:</span>
                                <span className="">
                                    <span className="ps-1">{adults}</span>
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between text">
                                <span className="">Childrens:</span>
                                <span className="">
                                    <span className="ps-1">{children}</span>
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between text">
                                <span className="">Package Price per person:</span>
                                <span className="ps-1">Rs. {packagePrice}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between text">
                                <span className="">GST @18%:</span>
                                <span className="ps-1">Rs. {GST}</span>
                            </div>
                            <div className="border-bottom mb-2 mt-2" />
                            <div className="d-flex align-items-center justify-content-between text mb-4">
                                <span>Total</span>
                                <span className="">
                                    <span className="ps-1">Rs. {total}</span>
                                </span>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <br />
                                <span className="far fa-file-alt text">
                                    <span className="ps-2 lineCustom">Booking Refrence ID:</span>
                                </span>
                                <span className="ps-3">{BookingRefID}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between text mt-5">
                                <div className="d-flex flex-column text">
                                    <span>Customer Support:</span> <span>online chat 24/7</span>
                                </div>
                                <div className="btn btn-primary rounded-circle">
                                    <span className="fas fa-comment-alt" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card box2 shadow-sm">
                        <div className="d-flex align-items-center justify-content-between p-md-5 p-4">
                            <span className="h5 fw-bold m-0">Payment methods</span>
                            <div className="btn btn-primary bar">
                                <span className="fas fa-bars" />
                            </div>
                        </div>
                        <ul className="nav nav-tabs mb-3 px-md-4 px-2">
                            <li className="nav-item-custom">
                                <a className="nav-link px-2 active" aria-current="page" href="#">
                                    Credit Card
                                </a>
                            </li>
                            <li className="nav-item-custom ms-auto">
                                <a className="nav-link px-2" href="#">
                                    + More
                                </a>
                            </li>
                        </ul>
                        <div className="px-md-5 px-4 mb-4 d-flex align-items-center"></div>
                        <form  action="/thanks" >
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex flex-column px-md-5 px-4 mb-4">
                                        <span className="mb-2">Credit Card</span>
                                        <div className="inputWithIcon">
                                            <input className="form-control required-input" type="text" name='creditCard' required  onChange={handleChange} />
                                            <span className="customPos">
                                                <img
                                                    src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png"
                                                    alt=""
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" id="cus">
                                    <div className="d-flex flex-column px-md-0 ps-md-5 px-4 mb-4">
                                        <span className="mb-2">
                                            Expiration<span className="ps-1">Date</span>
                                        </span>
                                        <div className="inputWithIcon">
                                            <input type="text" className="form-control required-input" name='date' required />
                                            <span className="fas fa-calendar-alt mr-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" id="cusR">
                                    <div className="d-flex flex-column pe-md-5 px-md-0 px-4 mb-4">
                                        <span className="mb-2">Code CVV</span>
                                        <div className="inputWithIcon">
                                            <input type="password" className="form-control required-input" name='cvv' required />
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-column px-md-5 px-4 mb-4">
                                        <span className="mb-2">Name</span>
                                        <div className="inputWithIcon">
                                            <input
                                                className="form-control text-uppercase custom required-input"
                                                type="text"
                                                name='name'
                                                required
                                                // onChange={handleChange2}
                                            />
                                            <span className="far fa-user " />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 px-md-5 px-4 mt-3">
                                  <button type='submit' onClick={handleSubmit} className="btn btn-primary w-100">Pay {total} Rs.</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Payment;