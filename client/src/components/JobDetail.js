import React from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../libs/fake-data';

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    const { jobId } = this.props.match.params;
    this.state = {
      job: jobs.find(job => job.id === jobId)
    }
  }

  render() {
    const { job } = this.state;
    return (
      <>
        <h1 className='title'>{job.title}</h1>
        <h2 className='subtitle'>
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className='box'>{job.description}</div>
      </>
    );
  }
}

export default JobDetail;