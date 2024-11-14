import './App.css';
import Home from './components/js/Home';
import About from './components/js/About';
import India from './components/js/india';
import International from './components/js/International';
import Thanks from './components/js/Thanks';
import IndiaTour from './components/js/IndiaTour';
import Contact from './components/js/Contact';
import Not404 from './components/js/Not404';
import Signup from './components/js/Signup-form';
import ProtectedRoute from './components/js/ProtectedRoute';
import Logout  from './components/js/Logout';
import BookingForm from './components/js/BookingForm';
import BookingInter from './components/js/BookingInter';
import Payment from './components/js/Payment';
import Thankyou from './components/js/thankyou';
import InterTour from './components/js/InterTour';
import BookingTable from './components/js/MyBooking';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />      
          <Route path="/about" element={<About />} />
          <Route path="/india" element={<India />} />
          <Route path="/international" element={
              <International /> } />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/bookings" element={<BookingTable />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/domestic/:destination" element={<IndiaTour />} />
          <Route path="/international/:destination" element={<InterTour />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Not404 />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/bookingDomestic" element={
          <ProtectedRoute><BookingForm /></ProtectedRoute>
          } />
          <Route path="/bookingInternational" element={
            <ProtectedRoute> <BookingInter /> </ProtectedRoute> } />
            
          <Route path="/payment" element={
             <ProtectedRoute> <Payment /> </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}
export default App;
