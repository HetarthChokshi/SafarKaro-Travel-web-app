import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from './AxiosInstance.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingTable = () => {
  const username = sessionStorage.getItem('user_id');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user_id=sessionStorage.getItem('user_id');
  const handleDownload=async (booking_id)=>{
    try {
      const response = await axios.post('api/downpdf/',{
        booking_id:booking_id,
        'username':user_id
      });
      console.log(response.data)
      toast.success(`PDF mailed to registered email successfully.`);
    }
    catch (err) {
      console.log(err)
      toast.error("PDF will be  mailed to registered email.");

    }
   
  }
  useEffect(() => {
    // Fetch bookings when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/bookings/${username}`);
        console.log(response.data);
        setBookings(response.data); // Set bookings data
        setLoading(false); // Turn off loading state
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="my" className="container my-5">
      <center>
        <h1 className="mb-4">My Bookings</h1>
        <section className="intro">
          <div className="bg-light shadow p-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="table-responsive bg-white">
                    <table className="table table-striped table-bordered mb-0"   style={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Booking ID</th>
                          <th scope="col">Booking Date</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Travellers</th>
                          <th scope="col">Travel Date</th>
                          <th scope="col">Tour Type</th>
                          <th scope="col">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {
                          bookings.map((book) => (
                         
                            <tr key={book.booking_id}>
                              <th scope="row" style={{ color: "#666666" }}>
                                {book.booking_id}
                              </th>
                              <td>{book.booking_date}</td>
                              <td>{book.destination}</td>
                              <td>{book.no_of_travellers}</td>
                              <td>{book.travel_date}</td>
                              <td>{book.tour}</td>
                            </tr>
                          ))
                        } */}
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center", color: "#666666" }}>
                              No bookings
                            </td>
                          </tr>
                        ) : (
                          bookings.map((book) => (
                            <tr key={book.booking_id}>
                              <th scope="row" style={{ color: "#666666" }}>
                                {book.booking_id}
                              </th>
                              <td>{book.booking_date}</td>
                              <td>{book.destination}</td>
                              <td>{book.no_of_travellers}</td>
                              <td>{book.travel_date}</td>
                              <td>{book.tour}</td>
                              <td><button  className="btn btn-sm btn-primary" onClick={() => handleDownload(book.booking_id)}>
                Download
              </button></td>
                            </tr>
                          ))
                        )}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Link to="/" className="btn btn-primary mt-4" style={{backgroundColor:'#ff6d1e',border:'0px'}}>
          Go Back to Home
        </Link>
      </center>
      <ToastContainer />
    </div>
  );
};

export default BookingTable;
