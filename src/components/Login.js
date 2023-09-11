import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import "./login.css";
const Login = (props) => {
  const [credentials, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3300/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("successfully login", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials: " + json.error, "danger");
    }
    const response2 = await fetch("http://localhost:3300/api/auth/getuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const json2 =await response2.json()
      // console.log(json2.name);
      props.userName(json2.name);
      localStorage.setItem('userName',json2.name)
      console.log(localStorage.getItem('userName'))

  };

  const onChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
  };
  

  return (
    <div className="container1">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={handleSubmit} className="login">
            <div className="login__field">
              <PersonIcon className="login__icon fas fa-user"></PersonIcon>
              <input
                onChange={onChange}
                type="email"
                className="login__input"
                id="email"
                name="email"
                value={credentials.email}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="login__field">
              <LockIcon className="login__icon fas fa-lock"></LockIcon>
              <input
                minLength={8}
                required
                onChange={onChange}
                type="password"
                className="login__input"
                id="password"
                value={credentials.password}
                name="password"
                placeholder="Password"
              />
            </div>

            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <ArrowForwardIosIcon className="button__icon fas fa-chevron-right"></ArrowForwardIosIcon>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
