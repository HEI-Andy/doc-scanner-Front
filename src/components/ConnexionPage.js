import React, { useState } from 'react';
import './ConnexionPage.css'; 
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function ConnexionPage() {
  const [username ,setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/sign-up', {
        username,
        email,
        password
      });

      if (response.status === 200) {
        setSignUpSuccess(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setErrorMessage('');
      } else {
        setSignUpSuccess(false);
        console.error('Sign up failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSignUpSuccess(false);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
    }
  
    try {
      const response = await axios.post('http://localhost:8080/sign-in', {
        username,
        password
      });
  
      if (response.status === 200) {
        setSuccessMessage('Sign-in successful');
       navigate('/HomePage');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Invalid username or password.');
    }
  };
  
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
    <div className="form-container sign-up">
      <form>
        <h1>Create Account</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {signUpSuccess && <p className="success">Sign-up successful</p>}
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <span>or use your username password</span>
          <input type="username" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
          <a href="#">Forget Your Password?</a>
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Sign in with your personal details to access all the features of the document scanning application.</p>
            <button className="hidden" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to unlock all the features of the document scanning application.</p>
            <button className="hidden" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnexionPage;