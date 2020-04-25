const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});
let db = mongoose.connection;
db.once('open', function(){ console.log('Connected to MongoDB') })

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  repoid: Number,
  ownerid: Number,
  url: String,
  description: String,
  private: Boolean,
  fork: Boolean,
  size: Number,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  created_at: Date,
  updated_at: Date,
  pushed_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, next) => {

    var newRepo = new Repo({
      name: repo.name,
      owner: repo.owner.login,
      repoid: repo.id,
      ownerid: repo.owner.id,
      url: repo.html_url,
      description: repo.description,
      private: repo.private,
      fork: repo.fork,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
    });

    newRepo.save((err, document)=>{
      if (err) {
        return console.log(err);
      } else {
        next(null, document);
      }
    })

}

let fetchTwentyFive = (req, res, next) => {
  Repo.find({}, function(err, documents) {
    if (err) {
      console.log(err);
    } else {
      next(null, documents);
    }
  })
}

module.exports.save = save;
module.exports.fetchTwentyFive = fetchTwentyFive;