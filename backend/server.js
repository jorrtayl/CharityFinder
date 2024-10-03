const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const ProPublicaURL = "https://projects.propublica.org/nonprofits/api/v2/";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/search/:name', (req, res) => {
  let name = req.params["name"]
  axios.get(`${ProPublicaURL}search.json?q=${name}`)
    .then(response => response.data)
    .then(json => {
      res.send(json)
    })
    .catch(err => {
      console.error(err)
      res.send("{}")
    })
});

app.get('/organization/:ein', (req, res) => {
  let ein = req.params["ein"]
  axios.get(`${ProPublicaURL}organizations/${ein}.json`)
    .then(res => res.data)
    .then(json => {
      res.send(json)
    })
    .catch(err => {
      console.error(err)
      res.send("{}")
    })
})

// Last Precedence at the moment

app.get('/keysearch/:tag', (req, res) => {
  let tag = req.params["tag"]
  axios.get(`${ProPublicaURL}search.json?ntee%5Bid%5D=${tag}`)
    .then(response => response.data)
    .then(json => {
      res.send(json)
    })
    .catch(err => {
      console.error(err)
      res.send("{}")
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\nAvailable Routes:\n\t/search/:name\n\t/organization/:ein\n\t/keysearch/:tag`);
});