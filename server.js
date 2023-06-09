const express = require('express');
const path = require('path');
const app = express();

app.get('/marketing-ui', function (_, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/healthcheck', (_, res) => res.sendStatus(200));

app.use(express.static(path.join(__dirname, 'build')));

app.listen(5050);
