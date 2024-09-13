const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const ProPublicaURL = "https://projects.propublica.org/nonprofits/api/v2/";

const app = express();
const PORT = process.env.PORT || 8123;

app.use(cors());
app.use(bodyParser.json());

app.get('/search/:name', (req, res) => {
  let name = req.params["name"]
  axios.get(`${ProPublicaURL}search.json?q=${name}`)
    .then(response => response.data)
    .then(json => {
      console.log(json)
      res.send(json)
    })
});

// app.get('organization/:ein', (req, res) => {
//   let ein = req.params["ein"]
//   res.send(ein)
// })
/*
Last Precedence at the moment

app.get('keysearch', (req, res) => {
  
})*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});