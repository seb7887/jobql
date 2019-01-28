import React from 'react';
import { Query } from 'react-apollo';
import { jobsQuery } from '../libs/queries';
import JobList from './JobList';

const JobBoard = () => (
  <Query query={jobsQuery}>
    {({ data, loading }) => {
      const { jobs } = data;

      if (loading || !jobs) {
        return <div>Loading...</div>
      }

      return (
        <div>
          <h1 className='title'>Job Board</h1>
          <JobList jobs={jobs} />
        </div>
      );
    }}
  </Query>
)

export default JobBoard;