import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import "./navbar.css";
const Navbar = (props) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <div className="navbar">
      <nav className="navbarContainer">
        <div className="navbarDiv1">
          <Link className="navbartitle" to="/">
            NoteApp
          </Link>

          <div className="navbarDiv2">
            <ul className="navbar-ul">
              <li className="navbar-li">
                <Link className="li-link" to="/">
                  Home
                </Link>
              </li>
              <li className="navbar-li">
                <Link className="li-link" to="/about">
                  About{" "}
                </Link>
              </li>
            </ul>
            </div>

            {!localStorage.getItem("token") ? (
              <div className="navbar-end">
                <div className="end-items">
                  <Button
                    variant="outlined"
                    size="small"
                    href="/login"
                    sx={{ color: "white", borderColor: "white" ,'&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: 'none',color:'#5D54A4',borderColor:'#5D54A4'
                    },
                    '&:active': {
                      backgroundColor: '#b9b4fc',
                    },}}
                    startIcon={<AccountCircleSharpIcon />}
                  >
                    Login
                  </Button>
                </div>
                <div className="end-items">
                  <Button
                    variant="outlined"
                    size="small"
                    href="/signup"
                    sx={{ color: "white", borderColor: "white",'&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: 'none',color:'#5D54A4',borderColor:'#5D54A4'
                    },
                    '&:active': {
                      backgroundColor: '#b9b4fc',
                    }, }}
                    startIcon={<PersonAddAltSharpIcon />}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            ) : (
              <div className="navbar-end">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    border: "0.1rem solid white",
                    padding: "0.2rem",
                    borderRadius: "10rem",
                    height:"2rem",
                    width:"8rem",
                  }}
                >
                  <Avatar sx={{ width: 22, height: 22,'&:hover': {color:'#5D54A4',backgroundColor:'white'} }}>
                    <PersonIcon />
                  </Avatar>
                  <span style={{ color: "white", margin: "0 0.6rem" }}>
                    {localStorage.getItem("userName")}
                  </span>
                </div>
                <div className="end-items">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleLogout}
                    sx={{ color: "white", borderColor: "white",'&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: 'none',color:'#5D54A4',borderColor:'#5D54A4'
                    },
                    '&:active': {
                      backgroundColor: '#b9b4fc',
                    }, }}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
