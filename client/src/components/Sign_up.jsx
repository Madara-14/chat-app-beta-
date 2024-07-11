import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './signUp.css'
import axios from 'axios'



function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // msd, setmsg is msg from backend to chk user created or not 
  const [msg, setmsg] = useState('');
  const navigate =useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    // console.log({ name, email, password });
    
        
        // get the response from the server 
   const res = await axios.post('http://localhost:3001/register',{name,email,password})
     setmsg(res.data.message)
       console.log('data:', res.data);
     if(res.data.message ==='User registered successfully'){
      console.log('here ');
        console.log(res.data);
        navigate('/Users', { state: { user: res.data.user  , info:res.data.user.name + ' entered the chat  '} });

    }
  };
 

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <p>Already have an account?  <Link to='/login' className='login-button'>Login</Link> </p> 
  
      {msg ? <div className='error'>{msg}</div> : null}

      
    </div>
  );
}

export default SignUp;
