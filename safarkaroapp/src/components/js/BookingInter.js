import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/booking.css";


// Assuming you import the number of persons from a context or state

const numPersons = sessionStorage.getItem('no_of_travellers');
const FormDataInter = () => {
  const [formDataInter, setformDataInter] = useState(
    Array.from({ length: numPersons }, () => ({
      name: "",
      age: "",
      mobile: "",
      email: "",
      travelDate: "",
      country: "",
      pancard: "",
      passportNo: "",
      issueDate: "",
      tour:"International",
    }))
  )
  return { formDataInter, setformDataInter };
}


const BookingInter = () => {
  const navigate = useNavigate();
  const { formDataInter, setformDataInter } = FormDataInter();

  useEffect(() => {
    setformDataInter(Array.from({ length: numPersons }, () => ({
      name: "",
      age: "",
      mobile: "",
      email: "",
      travelDate: "",
      country: "",
      pancard: "",
      passportNo: "",
      issueDate: "",
      tour:"International",
    })));
    sessionStorage.setItem('Booking',false);
  }, [numPersons]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newformDataInter = [...formDataInter];
    newformDataInter[index] = { ...newformDataInter[index], [name]: value };
    setformDataInter(newformDataInter);
    console.log(formDataInter)
  };

  const nextPay = () => {
    const inputs = document.querySelectorAll('.required-input'); // Select all inputs with class 'required-input'
  
        for (let input of inputs) {
          if (!input.value.trim()) {
            alert(`${input.name} is empty. Please fill it in.`);
            return; // Stop the function if any field is empty
          }
        }
    sessionStorage.setItem('formDataInter',JSON.stringify(formDataInter));
    navigate('/payment');
  }

  return (
    <div id="booking" className="page-background">
      {/* body  */}
      <div className="container">
        <h1 className="heading">Travellers Details</h1>

        {/* Person 1 Fields */}
        <div className="form-group">
          <h2 className="sub-heading">Person 1:</h2>

          <label className="label">Name<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="name"
            placeholder="Enter Full Name"
            required
            value={formDataInter[0].name}
            onChange={(e) => handleInputChange(e, 0)}
          />

          <label className="label">Age<span className="red-text">*</span></label>
          <input
            type="number"
            className="form-control required-input"
            name="age"
            required
            min='18'
            placeholder="Enter Age"
            value={formDataInter[0].age}
            onChange={(e) => handleInputChange(e, 0)}
          />

          <label className="label">Mobile<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formDataInter[0].mobile}
            required
            onChange={(e) => handleInputChange(e, 0)}
            maxLength="10"  // Ensures no more than 10 digits
          />

          <label className="label">Email<span className="red-text">*</span></label>
          <input
            type="email"
            className="form-control required-input"
            name="email"
            required
            placeholder="Enter Email Address"
            value={formDataInter[0].email || ""} // Ensure email is included in formDataInter
            onChange={(e) => handleInputChange(e, 0)}
          />
          <label className="label">Travel Date:<span className="red-text">*</span></label>
          <select
            className="form-control required-input"
            name="travelDate"
            value={formDataInter[0].travelDate || ""}
            onChange={(e) => handleInputChange(e, 0)}
          >
            <option value="">Select Travel Date</option>
            <option value="2024-10-05">October 5, 2024</option>
            <option value="2024-10-15">October 15, 2024</option>
            <option value="2024-11-02">November 2, 2024</option>
            <option value="2024-11-22">November 22, 2024</option>
            <option value="2024-12-08">December 8, 2024</option>
            <option value="2024-12-25">December 25, 2024</option>
            {/* Add more specific dates as needed */}
          </select>

          <label className="label">Country<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="country"
            required
            placeholder="Enter Country"
            value={formDataInter[0].country || ""} // Ensure email is included in formDataInter
            onChange={(e) => handleInputChange(e, 0)}
          />
          <label className="label">Pancard<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="pancard"
            required
            placeholder="Enter Pancard No"
            value={formDataInter[0].pancard || ""} // Ensure email is included in formDataInter
            onChange={(e) => handleInputChange(e, 0)}
          />

          <label className="label">Passport No<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="passportNo"
            required
            placeholder="Enter Passport no"
            value={formDataInter[0].passportNo || ""}
            onChange={(e) => handleInputChange(e, 0)}
          />
          <label className="label">Issue Date<span className="red-text">*</span></label>
          <input
            type="date"
            className="form-control required-input"
            name="issueDate"
            required
            placeholder="Enter Issue Date"
            value={formDataInter[0].issueDate || ""}
            onChange={(e) => handleInputChange(e, 0)}
          />

        </div>
      

        {/* Additional Persons Fields */}
        {Array.from({ length: numPersons - 1 }).map((_, index) => (
          <div key={index + 1} className="form-group">
            <h2 className="sub-heading">Person {index + 2}:</h2>

            <label className="label">Name<span className="red-text">*</span></label>
            <input
              type="text"
              className="form-control required-input"
              name="name"
              placeholder="Enter Full Name"
              required
              value={formDataInter[index + 1].name}
              onChange={(e) => handleInputChange(e, index + 1)}
            />

            <label className="label">Age<span className="red-text">*</span></label>
            <input
              type="number"
              className="form-control required-input"
              name="age"
              required
              placeholder="Enter Age"
              value={formDataInter[index + 1].age}
              onChange={(e) => handleInputChange(e, index + 1)}
            />

            <label className="label">Mobile</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formDataInter[index + 1].mobile}
              onChange={(e) => handleInputChange(e, index + 1)}
              maxLength="10"  // Ensures no more than 10 digits
            />
            <label className="label">Country<span className="red-text">*</span></label>
            <input
              type="text"
              className="form-control"
              name="country"
              required
              placeholder="Enter Country"
              value={formDataInter[index + 1].country || ""} // Ensure email is included in formDataInter
              onChange={(e) => handleInputChange(e, index + 1)}
            />
               <label className="label">Pancard<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="pancard"
            required
            placeholder="Enter Pancard No"
            value={formDataInter[index+1].pancard || ""} // Ensure email is included in formDataInter
            onChange={(e) => handleInputChange(e, index+1)}
          />

          <label className="label">Passport No<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="passportNo"
            required
            placeholder="Enter Passport no"
            value={formDataInter[index+1].passportNo || ""}
            onChange={(e) => handleInputChange(e, index+1)}
          />
          <label className="label">Issue Date<span className="red-text">*</span></label>
          <input
            type="date"
            className="form-control"
            name="issueDate"
            required
            placeholder="Enter Issue Date required-input"
            value={formDataInter[index+1].issueDate || ""}
            onChange={(e) => handleInputChange(e, index+1)}
          />

          </div>
        ))}

        <button onClick={nextPay} className="proceed-button">Proceed next</button>
      </div>
      <div>
          <center><p><b>Note:</b> For children less than 10 years of age No charges are there.</p></center>
        </div>

      {/* footer */}
      <footer>
        <div id="footer" className="container-fluid bg-dark text-light p-2">
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
  );
};

export default BookingInter;
export {FormDataInter};
