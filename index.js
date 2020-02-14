// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');



//I was playing around with this code to build a db from here
//const fs = require('fs');
//let rawdata = fs.readFileSync('C:/Users/April/Documents/MobIndex/express-ads-api/src/mobindex.json');
//let country = JSON.parse(rawdata);
//console.log(country);




// defining the Express app


const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// ... leave the other require statements untouched ...


// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
  res.send(await getAds());
});

app.post('/', async (req, res) => {
  const newAd = req.body;
  await insertAd(newAd);
  res.send({ message: 'New ad inserted.' });
});

// endpoint to delete an ad
app.delete('/:id', async (req, res) => {
  await deleteAd(req.params.id);
  res.send({ message: 'Ad removed.' });
});

// endpoint to update an ad
app.put('/:id', async (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ message: 'Ad updated.' });
});





// start the in-memory MongoDB instance and test a hardcoded DB

startDatabase().then(async () => {
  await insertAd({ROG3: 'PP'});
  await insertAd({CountryCode: 'HT'});
  await insertAd({NumberofEvangelicalsScore: '1.56'});
  await insertAd({NumberofEvangelicalsRank: 'Low'});

//Tested in postman to get 
/*
    {
        "_id": "5e42d6a05dd111535c7ea21a",
        "ROG3": "PP"
    },
    {
        "_id": "5e42d6a05dd111535c7ea21b",
        "CountryCode": "HT"
    },
    {
        "_id": "5e42d6a05dd111535c7ea21c",
        "NumberofEvangelicals": "1600000"

*/

//WIP connect to live MobIndex with Compass and test with postman

  

  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});

function newFunction() {
  return require('mongodb');
}
