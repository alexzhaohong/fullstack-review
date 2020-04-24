const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const database = require('../database');


let app = express();
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('POST ', req.body);
  github.getReposByUsername(req, res, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      console.log(response.statusCode, 'from GitHub API') // 200
      console.log(response.headers['x-ratelimit-remaining'], ' requests remaining')
      console.log(info.length + ` repos for ${info[0].owner.login}`)

      database.save(null, info);

      res.send('200');
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get route');
  console.log(req.body);
  res.send('200');
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

