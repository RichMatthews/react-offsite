const express = require('express')
const app = express()
const port = 3007
const cors = require('cors')
var bodyParser = require('body-parser')
const fs = require('fs')

app.listen(port, () => console.log(`SERVER BOOTED SUCCESS! Listening on port ${port}!`))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors())

app.get("/countries", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.countries);
  });
})
