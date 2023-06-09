const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/marketing-ui', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/marketing-ui/healthcheck', (_, res) => res.sendStatus(200));

app.listen(5050);
