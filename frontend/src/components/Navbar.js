import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { set } from "local-storage";
import { Redirect } from "react-router-dom";

class Navbar extends Component {


  render(){
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            <h4 style={{ color: "red" }}>Prevent Corona</h4>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" style={{ marginLeft: "40px" }}>
                <Link
                  to="/home"
                  className="nav-link"
                  style={{ color: "black" }}
                >
                  Home
                </Link>
              </li>
              <li className="navbar-item" style={{ marginLeft: "40px" }}>
                <Link to="/map" className="nav-link" style={{ color: "black" }}>
                  Map
                </Link>
              </li>
              <li className="navbar-item" style={{ marginLeft: "40px" }}>
                <Link
                  to="/chatbot"
                  className="nav-link"
                  style={{ color: "black" }}
                >
                  Chat with bot
                </Link>
              </li>
              <li className="navbar-item" style={{ marginLeft: "40px" }}>
                <Link to="/" className="nav-link" style={{ color: "blue" }}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
