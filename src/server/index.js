const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.get('/api', (req, res) => {
  console.log(req);
  // Call MeaningCloud api

  // res.send(apiresponse);
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
