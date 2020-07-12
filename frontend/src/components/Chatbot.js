import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import { getFromStorage } from "./storage";

function Message(props) {
  return (
    <div>
      <div class="container1" style={{ marginRight: "400px" }}>
        <p id="message">
          <span>
            <img src="data:image/png;base64,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"></img>
          </span>
          {props.user}
        </p>
      </div>

      <div
        class="container1 darker"
        style={{ marginLeft: "400px", color: " white" }}
      >
        <p id="message">
          {" "}
          <span>
            <img src="data:image/png;base64,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"></img>
          </span>
         {props.bot}
        </p>
      </div>
    </div>
  );
}

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      chats: [],
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onClick() {
    axios
      .post("http://localhost:4000/sendMsg", { msg: this.state.msg })
      .then((res) => {
        let newList = [...this.state.chats, res.data];
        this.setState({
          chats: newList,
        });
      })
      .catch((err) => alert(err));

    this.setState({
      msg: "",
    });
  }

  onChange(e) {
    this.setState({
      msg: e.target.value,
    });
  }

  render() {

if (getFromStorage("local") === "true") {
  return (
    <div>
      <Navbar />
      <br /> <br /> <br /> <br />
      <div className="square">
        <center>
          <h4>Get Help from our Bot</h4>
        </center>
<br/>
        {this.state.chats.map((item) => {
          return <Message user={item.user} bot={item.bot} />;
        })}

        <div className="sticky">
          <div className="row">
            <div className="col-md-12">
              <div className="input-group mb-3">
                <input
                  value={this.state.msg}
                  onChange={this.onChange}
                  type="text"
                  className="form-control"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.onClick}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} else {

return <Redirect to="/" />;

}
}

}
export default Chatbot;
