import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BadgeIcon from '@mui/icons-material/Badge';

import "./signup.css";
const Signup = (props) => {
  const [credentials,setCredential] = useState({name:'',email:'',password:'',cpassword:''})
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    localStorage.removeItem("userName")
      e.preventDefault();
      const response = await fetch("http://localhost:3300/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
      });
      const json =await response.json()
      console.log(json);
      if(json.success){
          //save the auth token and redirect
          localStorage.setItem('token',json.authtoken);
          navigate("/login")
          props.showAlert("Successfully SignedUp ","success");

      }
      else{
        console.log(json.error)
          props.showAlert("Invalid credentials : "+json.error,"danger");
      }
  }

  const onChange = (e) => {
      setCredential({ ...credentials, [e.target.name]: e.target.value });
    };
  
  return (
    <div className="container2">
    <div className="screen2">
      <div className="screen__content2">
      <form onSubmit={handleSubmit} className="signup">
      <div className="signup__field">
        <BadgeIcon className="signup__icon fas fa-lock"></BadgeIcon>
          <input
          onChange={onChange}
            type="text"
            className="signup__input"
            id="name"
            name="name"
            value={credentials.name}
            placeholder="Enter Name"
          />
        </div>
        <div className="signup__field">
          <PersonIcon className="signup__icon fas fa-lock"></PersonIcon>
          <input
          className="signup__input"
          onChange={onChange}
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="Enter email"
          
          />
          
        </div>
        <div className="signup__field">
          <PasswordIcon className="signup__icon fas fa-lock"></PasswordIcon>
          <input
          className="signup__input"
          minLength={8}
          required
          onChange={onChange}
            type="password"
            id="password"
            value={credentials.password}
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="signup__field">
          <LockIcon className="signup__icon fas fa-lock"></LockIcon>
          <input
          value={credentials.cpassword}
          onChange={onChange}
            type="password"
            className="signup__input"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            minLength={8}
            required
          />
           <label htmlFor="cpassword" className='helperText'>{(credentials.password===credentials.cpassword)? "" : "Please Enter the correct password"}</label>
        </div>
        <button type="submit"  className="button signup__submit" disabled={!(credentials.password===credentials.cpassword)}>
          <span className="button2__text">
          Signup
          </span>
          <ArrowForwardIosIcon className="button2__icon fas fa-chevron-right"></ArrowForwardIosIcon>
        </button>
      </form>
      </div>
      <div className="screen__background2">
          <span className="screen__background2__shape screen__background2__shape4"></span>
          <span className="screen__background2__shape screen__background2__shape3"></span>
          <span className="screen__background2__shape screen__background2__shape2"></span>
          <span className="screen__background2__shape screen__background2__shape1"></span>
        </div>
    </div>
    </div>
  )
}

export default Signup
