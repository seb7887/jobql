import React from 'react';
import JobList from './JobList';
import { loadJobs } from '../libs/request';

class JobBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }
  }

  componentDidMount = async () => {
    const jobs = await loadJobs();
    this.setState({ jobs: jobs });
  }

  render() {
    const { jobs } = this.state;
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}

export default JobBoard;