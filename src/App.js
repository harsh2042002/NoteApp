import Navbar from "./components/Navbar";
import { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/Notestate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [alert, setAlert] = useState("");
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const [uname, setUname] = useState("");
  const userName = (pname) => {
    setUname({
      name: pname,
    });
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar uname={uname} />
          <Alert alert={alert} />

          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} userName={userName}/>}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
