import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import DisplayMap from "./components/DisplayMap";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from './components/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
        
          <br />
          <Route path="/home" exact component={Home} />
          <Route path="/chatbot" component={Chatbot} />
          <Route path="/map" component={DisplayMap} />
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
      </Router>
    </div>
  );
}

export default App;
