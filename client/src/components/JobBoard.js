import React from 'react';
import JobList from './JobList';
const { jobs } = require('../libs/fake-data');

class JobBoard extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}

export default JobBoard;