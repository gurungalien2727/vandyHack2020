import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { InfoWindow, Marker } from "google-maps-react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import { getFromStorage, setInStorage } from "./storage";

const mapStyles = {
  width: "70%",
  height: "50%",
};

export class DisplayMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {},
      pos: [],
      name: "",
      zipcode: "",
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/getMarker").then((res) => {
      this.setState({ pos: res.data });
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeZipCode(e) {
    this.setState({
      zipcode: e.target.value,
    });
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

  onsubmit(e) {
    e.preventDefault();

    const data = { name: this.state.name, zipcode: this.state.zipcode };
    axios
      .post(`http://localhost:4000/addMarker`, data)
      .then((res) => alert(res))
      .catch((err) => alert(err));
    this.setState({ zipcode: "", name: "" });
  }





  render() {

    if(getFromStorage('local')==="true"){

    return (
      <div >
        
        <Navbar />

      <br/><br/>
        <h2 style={{color:"white"}}>Check out Patients Count around you </h2>
        <br/>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{
            lat: 31.810101,
            lng: -85.972153,
          }}
        >
          {this.state.pos.map((item, index) => (
            <Marker
              onClick={this.onMarkerClick}
              name={"Zipcode: "+item.zipcode+ ' ||  Total Patient: '+item.count}
              position={{ lat: item.lat, lng: item.lng }} 
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
        <br />
      </div>
    );


    }


    else{

  return <Redirect to="/" />;

    }












  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAFVzTOdt2r0SMDgLabw8Eu6aT_d56090I",
})(DisplayMap);
