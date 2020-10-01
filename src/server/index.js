const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.get('/api', (req, res) => {
  console.log('API req: ', req);
  // Call MeaningCloud api
  const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
  const analysis = fetch(
    `${baseUrl}?key=${process.env.MEANING_CLOUD_API_KEY}&url="${req}"&lang=en`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log('Response: ', res);
    });

  res.send(analysis);
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
