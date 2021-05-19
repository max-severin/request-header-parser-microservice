const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

//;

app.use(cors());

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(`${__dirname}/public`));

//

app.get('/', (req, res) => res.sendFile(`${__dirname}/view/index.html`));

app.get('/api/whoami', (req, res) => {
  res.json({
    // ipaddress: '',
    // language: '',
    software: req.headers['user-agent'],
  });
});

//

app.listen(port, () => console.log(`Node is listening on port ${port}...`));