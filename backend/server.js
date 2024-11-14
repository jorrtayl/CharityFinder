import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import axios from 'axios'
import { nameSearch, nameGroupSearch, orgSearch, groupSearch, everySearch } from './routes.js';
import db from './database.js'

// console.log(await db.getCharity(1)); // test to see if query function imported successfully

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/descriptors/:ein', everySearch)

// Route to search charities by name
app.get('/search/:name', nameSearch);

// Route to search charities by name
app.get('/search/:name/:tag', nameGroupSearch);

// Route to get details of an organization by EIN
app.get('/organization/:ein', orgSearch)

// Route to search for organizations by tag (NTEE code)
app.get('/group/:tag', groupSearch);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available Routes:');
    console.log('\tGET /search/:name');
    console.log('\tGET /search/:name/:tag')
    console.log('\tGET /organization/:ein');
    console.log('\tGET /group/:tag');
});
