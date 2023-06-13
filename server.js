const express = require('express');
const path = require('path');
const app = express();

console.log(process.env);

app.use('/marketing-ui', express.static(__dirname + '/marketing-ui'))
app.get('/marketing-ui', function (_, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'marketing-ui', 'index.html'));
});

app.get('/healthcheck', (_, res) => res.sendStatus(200));



app.listen(5050);
