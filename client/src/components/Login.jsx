import React, { useState } from 'react';

import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'

import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // msg from backen to chk if user login succesfull or not 
  const [msg, setmsg] = useState('')

  // all prev stored msg of user 
  const [myArray, setMyArray] = useState([]);


     const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., send data to backend)
    // send email n password to the backend to chk if the email , password is correct
    const res = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
        // .then(res=>{console.log(res);})
    // console.log({ email, password });
    // Example: you can use axios to send login data to backend => res can be used for that whatever response will come from the backend will store in the res variable 
    // getting  data from backend to client 
     
     if (res.data.message === "Login successful") {
        const Allmessages= res.data.user.messages;
         console.log((Allmessages.length));
         for(let i=0; i<Allmessages.length ; i+=2){
          console.log(Allmessages[i].content);
         }
      //  console.log(typeof Allmessages)
      // console.log(res.data.user);
        // console.log("user(login page ):", res);
        navigate('/Users', { state: { user: res.data.user } });

      }
      if(res.data.message==='Invalid email or password'){
        setmsg(res.data.message);
      }
      
    };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p>New User <Link to ='/register' className='sign-btn'>Sign Up</Link></p>

      <div  >{msg? <p className='error'>{msg}</p>:null}</div>
    </div>
  );
}

export default Login;
