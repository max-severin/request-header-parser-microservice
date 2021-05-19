const express = require('express');
const app = express();
const cors = require('cors');
const requestIp = require('request-ip');
const port = 3000;

//;

app.use(cors());

app.use(requestIp.mw());

app.use((req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(`${__dirname}/public`));

//

app.get('/', (req, res) => res.sendFile(`${__dirname}/view/index.html`));

app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.clientIp,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});

//

app.listen(port, () => console.log(`Node is listening on port ${port}...`));