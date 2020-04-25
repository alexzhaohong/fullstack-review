import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }


  search (term) {
    console.log(`${term} was searched`);
    let url = '/repos';
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({term})
    };

    fetch(url, options)
      .then(response => response.json())
      .then(term => this.refreshRepos(term))
      .catch(error => console.error('Fetch operation problem:', error));
  }

  refreshRepos (term) {
    let url = '/repos';

    fetch(url)
      .then(response => response.json())
      .then(data => this.updateRepoState(data))
      .catch(error => console.error('Fetch operation problem:', error));
  }

  updateRepoState (data) {
    this.setState({repos: data});
  }

  componentDidMount() {
    this.refreshRepos('hello');
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));