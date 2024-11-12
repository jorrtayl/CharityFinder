import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import axios from 'axios'
import { orgs_to_OrgArray, pick_random_orgs, filing_to_FilingObj} from './util.js';
import db from './database.js'

// console.log(await db.getCharity(1)); // test to see if query function imported successfully

const ProPublicaURL = "https://projects.propublica.org/nonprofits/api/v2/";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Route to search charities by name
app.get('/search/:name', async (req, res) => {
    const name = req.params["name"];
    try {
        const response = await axios.get(`${ProPublicaURL}search.json?q=${name}`);
        const data = response.data;
        if (data.organizations) {
            res.json(JSON.stringify(orgs_to_OrgArray(data)));
        } else {
            res.status(404).json({ message: 'No organizations found.' });
        }
    } catch (err) {
        console.error('Error fetching data from ProPublica:', err.message);
        res.status(500).json({ error: 'An error occurred while fetching search results.' });
    }
});

// Route to search charities by name
app.get('/search/:name/:tag', async (req, res) => {
    const name = req.params["name"];
    const tag = req.params["tag"]
    try {
        const response = await axios.get(`${ProPublicaURL}search.json?q=${name}&ntee%5Bid%5D=${tag}`);
        console.log('API Response:', response.data); // Debugging
        const data = response.data;
        if (data.organizations) {
            res.json(JSON.stringify(orgs_to_OrgArray(data)));
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
            res.json(JSON.stringify(filing_to_FilingObj(data)));
        } else {
            res.status(404).json({ message: 'Organization not found.' });
        }
    } catch (err) {
        console.error('Error fetching organization details:', err.message);
        res.status(500).json({ error: 'An error occurred while fetching organization details.' });
    }
});

// Route to search for organizations by tag (NTEE code)
app.get('/group/:tag', async (req, res) => {
    const tag = req.params["tag"];
    try {
        const response = await axios.get(`${ProPublicaURL}search.json?ntee%5Bid%5D=${tag}`);
        const data = response.data;
        if (data.organizations) {
            res.json(JSON.stringify(pick_random_orgs(data)));
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
    console.log('\tGET /search/:name/:tag')
    console.log('\tGET /organization/:ein');
    console.log('\tGET /group/:tag');
});
