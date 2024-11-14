import '../scss/style.scss';
import React, { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

import axios from './AxiosInstance';

function Login({ setLogin }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [eyeClass, setEyeClass] = useState('fa fa-fw fa-eye');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const location = useLocation();

  const fetchUserIdByUsername = async (username) => {
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
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    if (eyeClass === "fa fa-fw fa-eye") {
      setEyeClass('fa fa-eye-slash')
    }
    else {
      setEyeClass("fa fa-fw fa-eye")
    }
  };
  const forgotPrompt = () => {

    let email = window.prompt('Please enter your registered email:');

    // email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email) {
      if (emailRegex.test(email)) {
        // Process send it to a backend server
        axios.get(`api/password_reset_token/${email}`)
        .then((response)=>{setToken(response.data.token);console.log(response.data.token)})
        .catch((error) => { alert('Something went wrong!');});
        
        if(token){
          const new_password = window.prompt('Enter new password:');
          axios.get(`api/password_reset/${token}/${new_password}`)
          .then(response =>{alert(response.data.message);setToken('')})
          .catch(error =>{alert(error.message)});
        }


      } else {
        alert('Please enter a valid email address.');
      }
    } else {
      alert('No email entered.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Sending the POST request to the login endpoint
    axios.post('api/token/', {
      username:username,
      password:password
    })
      .then( response => {
        // Handle successful login
        // Save tokens in local storage
        sessionStorage.setItem('access_token', response.data.access);
        sessionStorage.setItem('refresh_token', response.data.refresh);
        sessionStorage.setItem('isLogIN', true);
        sessionStorage.setItem('username', username);
           // Get the page where the user was redirected from or default to home
      const redirectPath = location.state?.from?.pathname || '/';
      navigate(redirectPath);
       
      })
      .catch(error => {
        setError('Invalid Username or Password.');
        console.error(error)
      });
  };

  return (
    <div className="img js-fullheight" id="login" >
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Sign in</h3>
                <form  className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required=""
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type={passwordVisible ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Password"
                      required=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      toggle="#password-field"
                      className={` ${eyeClass} field-icon toggle-password`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-40 text-md-right">
                    <a id="forgot" onClick={forgotPrompt} style={{ color: "#fff" }}>
                      Forgot Password
                    </a>
                  </div>
                  <div >
                    <p className="text-center register-line">Don't have an account? &nbsp;<span onClick={() => { setLogin(false) }} className='register'>Sign Up</span></p>
                  </div>
                  <div>
                    {error && <p className='register-line'>{error}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Login;
