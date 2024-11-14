import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/booking.css";


const numPersons = sessionStorage.getItem('no_of_travellers');

const FormData = () => {
  const [formData, setFormData] = useState(
    Array.from({ length: numPersons }, () => ({
      name: "",
      age: "",
      mobile: "",
      tour:"India"
    }))
  )
  return { formData, setFormData };
}
const BookingForm = () => {
  const navigate = useNavigate();
  const {formData,setFormData}=FormData();
  // Use the appropriate method to get the number of persons

  
  useEffect(() => {
    setFormData(Array.from({ length: numPersons }, () => ({
      name: "",
      age: "",
      mobile: "",
      tour:"India",
    })));
    sessionStorage.setItem('Booking',true);
  }, [numPersons]);

  
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setFormData(newFormData);
    console.log(formData)
  };

  const nextPay = () => {
    const inputs = document.querySelectorAll('.required-input'); // Select all inputs with class 'required-input'
  
    for (let input of inputs) {
      if (!input.value.trim()) {
        alert(`${input.name} is empty. Please fill it in.`);
        return; // Stop the function if any field is empty
      }
    }
    sessionStorage.setItem('formData',JSON.stringify(formData));
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
            value={formData[0].name}
            onChange={(e) => handleInputChange(e, 0)}
          />

          <label className="label">Age<span className="red-text">*</span></label>
          <input
            type="number"
            className="form-control required-input"
            name="age"
            required
            min="18"
            placeholder="Enter Age"
            value={formData[0].age}
            onChange={(e) => handleInputChange(e, 0)}
          />

          <label className="label">Mobile<span className="red-text">*</span></label>
          <input
            type="text"
            className="form-control required-input"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData[0].mobile}
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
            value={formData[0].email || ""} // Ensure email is included in formData
            onChange={(e) => handleInputChange(e, 0)}
          />
          <label className="label">Travel Date:<span className="red-text">*</span></label>
          <select
            className="form-control required-input"
            name="travelDate"
            value={formData[0].travelDate || ""}
            onChange={(e) => handleInputChange(e, 0)}
          >
            <option value="">Select Travel Date</option>
            <option value="2024-10-05">October 5, 2024</option>
            <option value="2024-10-15">October 15, 2024</option>
            <option value="2024-11-02">November 2, 2024</option>
            <option value="2024-11-22">November 22, 2024</option>
            <option value="2024-12-08">December 8, 2024</option>
            <option value="2024-12-25">December 25, 2024</option>
            
          </select>
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
              value={formData[index + 1].name}
              onChange={(e) => handleInputChange(e, index + 1)}
            />

            <label className="label">Age<span className="red-text">*</span></label>
            <input
              type="number"
              className="form-control required-input"
              name="age"
              required
              placeholder="Enter Age"
              value={formData[index + 1].age}
              onChange={(e) => handleInputChange(e, index + 1)}
            />

            <label className="label">Mobile</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData[index + 1].mobile}
              onChange={(e) => handleInputChange(e, index + 1)}
              maxLength="10"  // Ensures no more than 10 digits
            />
          </div>
        ))}

        <button onClick={nextPay} className="proceed-button" >Proceed next</button>
      </div>
      <div>
          <center><p><b>Note:</b> For children less than 10 years of age No charges are there.</p></center>
        </div>

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

export default BookingForm;
export { FormData };
