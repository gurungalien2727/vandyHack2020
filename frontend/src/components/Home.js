import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import { getFromStorage, setInStorage } from "./storage";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      zipcode: "",
      temperature: "",
      fever: false,
      nausea: false,
      fatigue: false,
      headache: false,
      congestion: false,
      status: "",
    };
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onChangeTemperature=this.onChangeTemperature.bind(this);
    this.onChangeFever=this.onChangeFever.bind(this);
    this.onChangeFatigue=this.onChangeFatigue.bind(this);
    this.onChangeHeadache=this.onChangeHeadache.bind(this);
    this.onChangeNausea=this.onChangeNausea.bind(this);
    this.onChangeCongestion=this.onChangeCongestion.bind(this);
    this.onChangeStatus=this.onChangeStatus.bind(this);


    this.onsubmit = this.onsubmit.bind(this);
    this.onChangeFever = this.onChangeFever.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/getMarker").then((res) => {
      this.setState({ pos: res.data });
    });
  }

  onChangeFullName(e) {
    this.setState({
      fullname: e.target.value,
    });
  }

  onChangeZipCode(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }

  onChangeTemperature(e) {
    this.setState({
      temperature: e.target.value,
    });
  }

  onChangeFever(e) {
    this.setState({
      fever: true,
    });
  }

  onChangeNausea(e) {
    this.setState({
      nausea: true,
    });
  }

  onChangeFatigue(e) {
    this.setState({
      fatigue: true,
    });
  }

  onChangeHeadache(e) {
    this.setState({
      headache: true,
    });
  }

  onChangeCongestion(e) {
    this.setState({
      congestion: true,
    });
  }

  onChangeStatus(e){
      this.setState({
          status:e.target.value
      })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onChangeFever(e) {
    

    if (this.state.fever) {
      this.setState({ fever: false });
    } else {
      this.setState({ fever: true });
    }
  }

  onsubmit(e) {
    e.preventDefault();
   


    const data = { fullname: this.state.fullname, zipcode: this.state.zipcode, temperature:this.state.temperature,
    fever:this.state.fever,nausea:this.state.nausea,fatigue:this.state.fatigue,headache:this.state.headache,congestion:this.state.congestion,status:this.state.status };

    alert(data.fullname+" "+data.zipcode+" "+data.temperature+" "+data.fever+" "+data.status);
    
    
 axios
  .post(`http://localhost:4000/addMarker`, data)
      .then((res) => console.log(res) )
      .catch((err) => alert(err));
 

 this.setState({ zipcode: "", fullname: "",temperature:"",fever:false,nausea:false,fatigue:false,headache:false,congestion:false,status:"" });
  }

  render() {
    if (getFromStorage("local") === "true") {
      return (
        <div>
          <Navbar />
          <br />
          <br />
          <div>
            <section class="container-fluid bg">
              <section class="row mt-12 justify-content-center">
                <section class="col-a12 col-sm-12 col-md-8">
                  <form class="form-container" style={{ color: "white" }} onSubmit={this.onsubmit}>
                    <div class="form-group">
                      <label for="exampleInputEmail1 bg-white">Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={this.state.fullname}
                        onChange={this.onChangeFullName}
                      />
                    </div>
                    <div class="form-group">
                      <label for="inputZip">Zip Code </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputZip"
                        value={this.state.zipcode}
                        onChange={this.onChangeZipCode}
                      />
                    </div>

                    <div class="form-group">
                      <label for="inputTemperature"> Temperature today </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputTemperature"
                        placeholder="In fahrenheit"
                        value={this.state.temperature}
                        onChange={this.onChangeTemperature}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Symptoms</label>
                      <div class="form-row">
                        <div class="form-group col-md-4">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                              checked={this.state.fever}
                              onChange={this.onChangeFever}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              fever
                            </label>
                          </div>
                        </div>
                        <div class="form-group col-md-4">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                          
                              id="inlineRadio2"
                              value="option2"
                              checked={this.state.nausea}
                              onChange={this.onChangeNausea}
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              Nausea
                            </label>
                          </div>
                        </div>

                        <div class="form-group col-md-4">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                             
                              id="inlineRadio2"
                              value="option2"
                              checked={this.state.fatigue}
                              onChange={this.onChangeFatigue}
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              fatigue
                            </label>
                          </div>
                        </div>

                        <div class="form-group col-md-5">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                            
                              id="inlineRadio2"
                              value="option2"
                              checked={this.state.headache}
                              onChange={this.onChangeHeadache}
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              headache
                            </label>
                          </div>
                        </div>

                        <div class="form-group col-md-4">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                            
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label
                              class="form-check-label"
                              for="inlineRadio2"
                              checked={this.state.congestion}
                              onChange={this.onChangeCongestion}
                            >
                              congestion
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">
                        How do you feel today?
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={this.state.status}
                        onChange={this.onChangeStatus}
                      ></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">
                      Submit
                    </button>
                  </form>
                </section>
              </section>
            </section>
          </div>
          <br />

          <br />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}


export default Home;