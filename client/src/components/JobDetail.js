import React from 'react';
import { Link } from 'react-router-dom';
import { loadJob } from '../libs/request';

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null
    }
  }

  componentDidMount = async () => {
    const { jobId } = this.props.match.params;
    const job = await loadJob(jobId);
    this.setState({ job: job });
  }

  render() {
    const { job } = this.state;
    if (!job) return null;
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