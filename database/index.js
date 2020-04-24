const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});

let repoSchema = mongoose.Schema({
  repoid: Number,
  name: String,
  // owner: String,
  // ownerid: Number,
  // private: Boolean,
  // url: String,
  // description: String,
  // fork: Boolean,
  // created_at: Date,
  // updated_at: Date,
  // pushed_at: Date,
  // size: Number,
  // stargazers_count: Number,
  // watchers_count: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (error, info) => {
  let i = 0
  Repo.id = info[i].id;
  Repo.name = info[i].name;
  Repo.forks_count = info[i].forks_count;

  console.log(Repo);
}

module.exports.save = save;