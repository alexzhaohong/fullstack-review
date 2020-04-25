import React from 'react';

var RepoListEntry = (props) => (

  <div>
    <a href={props.repo.url}>{props.repo.owner}/{props.repo.name}</a>
    <div>{props.repo.description} Size: {props.repo.size} fork: {props.repo.fork.toString()}</div>
  </div>

);

export default RepoListEntry;

// Size: {props.repo.size}