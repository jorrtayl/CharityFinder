const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const ProPublicaURL = "https://projects.propublica.org/nonprofits/api/v2/";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

<<<<<<< Updated upstream
// Route to search charities by name
app.get('/search/:name', async (req, res) => {
  const name = req.params["name"];
  try {
    const response = await axios.get(`${ProPublicaURL}search.json?q=${name}`);
    const data = response.data;
    if (data.organizations) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No organizations found.' });
    }
  } catch (err) {
    console.error('Error fetching data from ProPublica:', err.message);
    res.status(500).json({ error: 'An error occurred while fetching search results.' });
  }
});

// Route to get details of an organization by EIN
app.get('/organization/:ein', async (req, res) => {
  const ein = req.params["ein"];
  try {
    const response = await axios.get(`${ProPublicaURL}organizations/${ein}.json`);
    const data = response.data;
    if (data.organization) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Organization not found.' });
    }
  } catch (err) {
    console.error('Error fetching organization details:', err.message);
    res.status(500).json({ error: 'An error occurred while fetching organization details.' });
  }
});

// Route to search for organizations by tag (NTEE code)
app.get('/keysearch/:tag', async (req, res) => {
  const tag = req.params["tag"];
  try {
    const response = await axios.get(`${ProPublicaURL}search.json?ntee%5Bid%5D=${tag}`);
    const data = response.data;
    if (data.organizations) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No organizations found for this tag.' });
    }
  } catch (err) {
    console.error('Error fetching data by tag:', err.message);
    res.status(500).json({ error: 'An error occurred while fetching results by tag.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available Routes:');
  console.log('\tGET /search/:name');
  console.log('\tGET /organization/:ein');
  console.log('\tGET /keysearch/:tag');
=======
app.get('/search/:name', (req, res) => {
  let name = req.params["name"];
  let tags = req.query.tags ? req.query.tags.split(',') : [];

  // Build the API query string based on tags
  let apiUrl = `${ProPublicaURL}search.json?q=${name}`;
  if (tags.length > 0) {
    // You may need to customize this based on how the API accepts filters
    apiUrl += `&tags=${tags.join(',')}`;
  }

  axios.get(apiUrl)
    .then(response => response.data)
    .then(json => {
      res.send(json);
    })
    .catch(err => {
      console.error(err);
      res.send("{}");
    });
});

app.get('/organization/:ein', (req, res) => {
  let ein = req.params["ein"];
  axios.get(`${ProPublicaURL}organizations/${ein}.json`)
      .then(response => {
          const data = response.data;
          if (data && data.organization) {
              res.json({
                  name: data.organization.name,
                  mission: data.organization.mission || 'No mission available.',
                  ein: data.organization.ein,
                  address: data.organization.address || 'No address available.',
                  website: data.organization.website || 'No website available.',
                  // Include any other relevant fields from the response
              });
          } else {
              res.status(404).json({ error: 'Charity details not found.' });
          }
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to fetch charity details.' });
      });
});

// Last Precedence at the moment

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\nAvailable Routes:\n\t/search/:name\n\t/organization/:ein`);
>>>>>>> Stashed changes
});
