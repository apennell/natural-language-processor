const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();
app.use(express.static('dist'));
app.use(express.text());

// Base route to retrieve webpage
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

const getAnalysis = async (reqUrl) => {
  const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
  const key = process.env.MEANING_CLOUD_API_KEY;
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    maxRedirects: 20,
    timeout: 0,
  };
  const analysis = await fetch(
    `${baseUrl}?key=${key}&url=${reqUrl}&lang=en`,
    options
  )
    .then((res) => res.json())
    .catch((error) => 'Error retrieving results');
  return analysis;
};

// API route to retrieve and send sentiment analysis of given url
app.post('/api', async (req, res) => {
  const analysis = await getAnalysis(req.body);
  res.send(analysis);
});

// Run server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
