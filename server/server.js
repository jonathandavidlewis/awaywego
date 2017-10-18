var express = require('express');
var path = require('path');


// Port
const port = process.env.PORT || 1337;

let app = express();

// Serve up static files
app.use(express.static(path.join(__dirname, '../client/public/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/dist/index.html'));
});

app.listen(port, () => {
  console.log('Running on ' + port);
});
