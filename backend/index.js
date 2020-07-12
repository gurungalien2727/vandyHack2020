const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

//connection to database
const mongoose = require("mongoose");
const User = require("./models/Users");
const LoginInfo = require("./models/LoginInfo");
const Patient=require("./models/Patient");

mongoose.connect(
  "mongodb+srv://alien:alien@cluster0-lwriy.gcp.mongodb.net/vandyHacks?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.openUri("open", () => {
  console.log("Database connection established sucessfully");
});

//const http=require('http');
const https = require("https");

//middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//Registering User
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new LoginInfo({
    username,
    password,
  });
  newUser
    .save()
    .then(() => res.json("New User Registered"))
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});


app.post("/", (req, res) => {
  console.log(req.body.username + " " + req.body.password);
  LoginInfo.findOne({
    username: req.body.username,
    password: req.body.password,
  }).then(function (doc) {
    if (!doc) {
      console.log("No record found");
      res.json({ login: "unsucessful" });
    } else {
      console.log(doc._id);
      res.json({ login: "sucessful", id: doc._id, username: doc.username });
    }
  });
});


//Calling an API
app.post("/addMarker", (req, res) => {

 console.log(req.body.fullname+" "+req.body.zipcode+" "+req.body.temperature+" "+req.body.fever+" "+req.body.fatigue);

 const fullname=req.body.fullname;
 const zipcode=req.body.zipcode;
 const temperature=req.body.zipcode;
 const fever=req.body.fever;
 const nausea=req.body.nausea;
 const fatigue=req.body.fatigue;
 const headache=req.body.headache;
 const congestion=req.body.congestion;
 const status=req.body.status;
 const newPatient=new Patient({
   fullname,zipcode,temperature,fever,nausea,fatigue,headache,congestion,status
 }).save()
 


  User.findOne({ zipcode: req.body.zipcode }, function (err, result) {
    if (result == null) {
      console.log("Yes");
      console.log(req.body.fullname + " " + req.body.zipcode);

      let url = `https://www.zipcodeapi.com/rest/xfVdFAos4kEmLdidck5oYmIpLKz087Nc0l2l8QyCDG1Lsicmel6XuTOWjZAdPVmj/info.json/${req.body.zipcode}/degrees`;

      const pos = { userlat: "", lng: "", zipcode: req.params.id };

      let settings = { method: "Get" };

      fetch(url, settings)
        .then((r) => r.json())
        .then((json) => {
          console.log(json.lat + " " + json.lng);
          pos.lat = json.lat;
          pos.lng = json.lng;

          const name = req.body.fullname;
          const zipcode = req.body.zipcode;
          const lat = json.lat;
          const lng = json.lng;
          const count = 1;

          const newUser = new User({
            name,
            zipcode,
            lat,
            lng,
            count,
          });

          newUser
            .save()
            .then(() => res.json("Registered"))
            .catch((err) => {
              res.json(err);
              console.log(err);
            });
        });
    } else {
      console.log(result);
      User.findById(result._id).then((data) => {
        console.log(data);
        data.count = data.count + 1;
        console.log(data);
        data
          .save()
          .then(() => res.json("Count Updated"))
          .catch((err) => res.status(400).json("Error:" + err));
      });
    }
  });
});

app.get("/getMarker", (req, res) => {
  User.find()
    .then((pos) => res.json(pos))
    .catch((err) => res.json("Error: " + err));
});



//chatbot

const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const Users = require("./models/Users");

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg, projectId = "covid-19bot-xjetne") {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "/Users/aliengurung/Desktop/bot/unique.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  return result.fulfillmentText;
}

app.post("/sendMsg", (req, res) => {
  runSample(req.body.msg)
    .then((data) => {
      const msg = { user: req.body.msg, bot: data };
      res.json(msg);
    })
    .catch((err) => res.json(err));
});






app.listen(4000, (req, res) => {
  console.log("Server running on port 4000");
});
