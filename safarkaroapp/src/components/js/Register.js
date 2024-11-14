import '../scss/style.scss';
import React, { useState } from 'react';
import axios from './AxiosInstance';
import {useNavigate} from 'react-router-dom';
function Register({setLogin}) { 
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [eyeClass1, setEyeClass1] = useState('fa fa-fw fa-eye');
  const [eyeClass2, setEyeClass2] = useState('fa fa-fw fa-eye');
  const [password1,setPassword1]= useState('');
  const [password2,setPassword2]= useState('');
  const [username,setUsername]= useState('');
  const [errors, setErrors] = useState(false);
  const [apierror, setApierror] = useState(false);
  const [email, setEmail] = useState('');
  const navigate=useNavigate();


  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
    if (eyeClass1==="fa fa-fw fa-eye"){
    setEyeClass1('fa fa-eye-slash')
    }
    else{
      setEyeClass1("fa fa-fw fa-eye")
    }
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
    if (eyeClass2==="fa fa-fw fa-eye"){
    setEyeClass2('fa fa-eye-slash')
    }
    else{
      setEyeClass2("fa fa-fw fa-eye")
    }
  };

  const validateUsername = (name) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/
    if(!name){
      return 'Please enter username.'
    }
    if (!regex.test(name)) {
      return 'Please enter valid username. Username can only contain letters,digits and underscores.';
    }
    return '';
  };

  const validatePasswords = () => {
      if (!password1 || !password2) {
      return 'Please enter the passwords.';
    }
    if (password1 !== password2) {
      return 'Passwords do not match.';
    }
    if (password1.length < 8)
        return 'Min length should be 8.'
    return '';
  };
  const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    console.log(emailRegex.test(email))
    if (!emailRegex.test(email)){
      return 'Enter valid email.'
    }
    return '' ;
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePasswords();
    const emailError = validateEmail(email);

    if (usernameError || passwordError || emailError) {
      setErrors(`${usernameError} ${passwordError} ${emailError}`);
    } else {
      setErrors(false);
    

    try {
      axios.post('api/register/', { username, password:password1,email })
      .then(response => {
        console.log('Registration successful:', response.data);
        setLogin(true);
        
      })
      .catch(error => {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        setApierror(error.response.data.email);
      });     
  } catch (error) {
      console.error('Registration failed', error);
      console.error(error)
  }
}
  };


  return (
    <div className="img js-fullheight" id="login" >
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Sign Up</h3>
                <form  className="signin-form" onSubmit={handleSubmit}>
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
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field1"
                      type={passwordVisible1 ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Password"
                      required=""
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                    />
                    <span
                      toggle="#password-field1"
                      className={` ${eyeClass1} field-icon toggle-password`}
                      onClick={togglePasswordVisibility1}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field2"
                      type={passwordVisible2 ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Confirm password"
                      required=""
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                    <span
                      toggle="#password-field2"
                      className={` ${eyeClass2} field-icon toggle-password`}
                      onClick={togglePasswordVisibility2}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Signup
                    </button>
                  </div>
                  <div>
                  {errors && <p style={{ color: 'whitesmoke',fontSize:"14px",paddingLeft:"12px" }}>{errors}</p>} 
                  {apierror && <p style={{ color: 'whitesmoke',fontSize:"14px",paddingLeft:"12px" }}>{apierror}</p>} 
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

export default Register;