const express = require('express')
const app = express()
const port = 3007
const cors = require('cors')
var bodyParser = require('body-parser')
const fs = require('fs')
const firebase = require('firebase')

app.listen(port, () =>
  console.log(`SERVER BOOTED SUCCESS! Listening on port ${port}!`)
)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.options('*', cors())

var config = {
  apiKey: 'AIzaSyDuroAv5VuOM28_hs-lHBQ3vKp-cABrntI',
  authDomain: 'workout-programme.firebaseapp.com',
  databaseURL: 'https://workout-programme.firebaseio.com',
  projectId: 'workout-programme',
  storageBucket: '',
  messagingSenderId: '262391669134',
}
firebase.initializeApp(config)

app.get('/workouts', function(req, res) {
  const gymData = firebase.database().ref('gymData/previousWorkouts')
  gymData.once('value', function(snapshot) {
    const dataToSend = Object.values(snapshot.val())
    res.status(200).send(dataToSend)
  })
})

app.post('/workouts', function(req, res) {
  var gymData = firebase.database().ref('gymData/previousWorkouts')
  const newWorkout = gymData.push()
  const newWorkoutId = newWorkout.key
  const newWorkoutData = {
    ...req.body,
    id: newWorkoutId,
  }
  const newPath = firebase
    .database()
    .ref('gymData/previousWorkouts/' + newWorkoutId)
  newPath.set(newWorkoutData)
})

app.get('/exercises', function(req, res) {
  const gymData = firebase.database().ref('gymData/exercises')
  gymData.once('value', function(snapshot) {
    const dataToSend = Object.values(snapshot.val())
    res.status(200).send(dataToSend)
  })
})

app.post('/exercises', function(req, res) {
  var gymData = firebase.database().ref('gymData/exercises')
  const workoutList = req.body.workoutExercises.workouts
  gymData.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val()
      workoutList.forEach(workout => {
        if (workout.name === childData.name) {
          let pathToUpdate
          if (childData.previousWeights) {
            pathToUpdate = firebase
              .database()
              .ref(
                'gymData/exercises/' +
                  childData.id +
                  '/previousWeights/' +
                  childData.previousWeights.length
              )
          } else {
            pathToUpdate = firebase
              .database()
              .ref(
                'gymData/exercises/' + childData.id + '/previousWeights/' + 0
              )
          }
          pathToUpdate.update({
            date: req.body.date,
            weight: workout.weight,
          })
        }
      })
    })
  })
})
