import axios from 'axios'
import { ProPublicaURL, EveryURL, api_key } from './constants.js';
import { orgs_to_OrgArray, pick_random_orgs, filing_to_FilingObj} from './util.js';


export const everySearch = async (req, res) => { 
    const ein = req.params["ein"];
    try {
        const response = await axios.get(`${EveryURL}nonprofit/${ein}?apiKey=${api_key}`);
        const data = JSON.parse(JSON.stringify(response.data.data));
        if (data) {
            let org = {}
            if(data.nonprofit.logoCloudinaryId !== null) {
                org.logoUrl = data.nonprofit.logoUrl
            }
            org.description = data.nonprofit.description

            if(data.nonprofit.descriptionLong !== null) {
                org.descriptionLong = data.nonprofit.descriptionLong
            }
            res.json(org);
        } else {
            res.status(404).json({});
        }
    } catch (err) {
        console.error('Error fetching organization details:', err.message);
        res.status(500).json({ error: 'An error occurred while fetching organization details.' });
    }
}

export const nameSearch = async (req, res) => {
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
}

export const nameGroupSearch = async (req, res) => {
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
}

export const orgSearch = async (req, res) => {
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
}

export const groupSearch = async (req, res) => {
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
}