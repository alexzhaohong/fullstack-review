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
  console.log('POST route', req.body);
  github.getReposByUsername(req, res, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);

      console.log(response.statusCode, 'from GitHub API') // 200
      console.log(response.headers['x-ratelimit-remaining'], ' requests remaining')
      console.log(info.length + ` repos for ${req.body.term}`)

      if (!info.length) {
        res.status(500).send('No repos for username');
      } else {
        for (let repo of info) {
          database.save(repo, (err, document)=> {
            if (err) {
              console.log('error error')
              res.status(500).send(err)
            }})}
        res.send({done:'done'});
      }
    } else {
      res.status(response.statusCode).send('err')
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET route');
  database.fetchTwentyFive(req, res, (err, documents) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(documents);
    }
  })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

