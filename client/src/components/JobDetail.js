import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { jobQuery } from '../libs/queries';

class JobDetail extends React.Component {
  render() {
    return (
      <Query
        query={jobQuery}
        variables={{
          id: this.props.match.params.jobId
        }}
      >
        {({ data, loading }) => {
          const { job } = data;

          if (loading || !job) {
            return <div>Loading...</div>
          }

          return (
            <>
              <h1 className='title'>{job.title}</h1>
              <h2 className='subtitle'>
                <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
              </h2>
              <div className='box'>{job.description}</div>
            </>
          );
        }}
      </Query>
    );
  }
}

export default JobDetail;