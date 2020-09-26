const path = require('path');
const express = require('express');

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
