const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const firebase = require('firebase')

const app = express()

var config = {
  apiKey: "AIzaSyCyxSlFeKr_0qDI8C34v7n7d21RD_A3d6o",
  authDomain: "login-ea41f.firebaseapp.com",
  databaseURL: "https://login-ea41f.firebaseio.com",
  projectId: "login-ea41f",
  storageBucket: "login-ea41f.appspot.com",
  messagingSenderId: "45476267861"
};

const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

app.use(morgan('combined'))
app.use(bodyParse.json())
app.use(cors())

app.post('/register', (req, res) => {
  console.log("req is ", req.body);
  var userID;
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      console.log(`Account Created for ${req.body.email}`);
      console.log("current user is ", user.user.email);
      var userData = {
        email: user.user.email
      };
      userID = user.user.uid;
      console.log("userID is ", userID);
      firebaseApp.firestore().collection('users').doc(user.user.uid).set(userData)
      res.send({
        message: userID
      });
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
})

app.listen(process.env.PORT || 9090)
