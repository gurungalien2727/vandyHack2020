import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { getFromStorage, setInStorage } from "./storage.js";
import { set, get } from "local-storage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userId: "",
      isLoggedIn: false,
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onsubmit(e) {
    e.preventDefault();
  
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post("http://localhost:4000/", data).then((res) => {
      
      if (res.data.login === "sucessful") {
        this.setState({
          isLoggedIn: true,
          userId: res.data.id,
          username: res.data.username,
        });
      
      }
    });
  }

  render() {


    
     if (this.state.isLoggedIn) {

      this.setState({
        isLoggedIn:false
      })
      setInStorage("local", "true");
      setInStorage("id", this.state.userId);
      setInStorage("username", this.state.username);
      return <Redirect to="/home" />;
    }

  
    else {
      return (
        <div className="container">
          <div style={{ color: "white" }}>
            <h3 style={{ textAlign: "center", color: "red" }}>Prevent Corona</h3>
            <br />
            <form onSubmit={this.onsubmit}>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={this.onChangePassword}
                />
              </div>
              <br />
              <button
                type="submit"
                class="btn btn-light"
                style={{ marginLeft: "40%" }}
              >
                Login
              </button>
            </form>
            <br />
            <div>
              <Link
                to={{ pathname: "/register" }}
                style={{ color: "white", marginLeft: "40%" }}
              >
                Sign Up{" "}
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
