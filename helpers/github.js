const request = require('request');
// const config = require('../config.js');

let getReposByUsername = (req, res, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let username = req.body.term;
  let url = `https://api.github.com/users/${username}/repos?type=owner`

  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };

  // function callback(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     const info = JSON.parse(body);
  //     console.log(response.statusCode, 'from GitHub API') // 200
  //     console.log(response.headers['x-ratelimit-remaining'], ' requests remaining')
  //     console.log(info.length + ` repos for ${username}`)

  //     next(null, info);
  //   }
  // }

  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;