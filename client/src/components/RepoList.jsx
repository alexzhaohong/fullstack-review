import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';


const RepoList = (props) => (

  <div className="repo-list">
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo) =>
      <RepoListEntry key={repo.repoid} repo={repo}
      />
    )}
  </div>
)

export default RepoList;