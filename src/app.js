const express = require('express')
const app = express()
const port = 3007
const cors = require('cors')
var bodyParser = require('body-parser')
const fs = require('fs')

app.listen(port, () => console.log(`SERVER BOOTED SUCCESS! Listening on port ${port}!`))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.options('*', cors())

app.get("/visited", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.visitedCountries);
  });
})

app.post("/visited", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
     if (err) throw err;
     let dbData = JSON.parse(data);
     const countryToChange = dbData.countries.find(country => country.name === req.body.country)
     countryToChange.visited = !countryToChange.visited
     updatedJSONData = JSON.stringify(dbData)
     fs.writeFile('db.json', updatedJSONData, 'utf8', function(err, data) {
        if (err) throw err;
         res.status(200).send("Basket was updated");
     });
  });
})

app.get("/countries", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.countries);
  });
})

app.post("/countries", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
     if (err) throw err;
     let dbData = JSON.parse(data);
     dbData.countries = req.body.allCountries
     updatedJSONData = JSON.stringify(dbData)
     fs.writeFile('db.json', updatedJSONData, 'utf8', function(err, data) {
        if (err) throw err;
         res.status(200).send("Basket was updated");
     });
  });
})
