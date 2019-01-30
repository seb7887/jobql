import React from 'react';
import { Query } from 'react-apollo';
import { companyQuery } from '../libs/queries';
import JobList from './JobList';

class CompanyDetail extends React.Component {
  render() {
    return (
      <Query
        query={companyQuery}
        variables={{
          id: this.props.match.params.companyId
        }}
      >
        {({ data, loading }) => {
          const { company } = data;

          if (loading || !company) {
            return <div>Loading...</div>
          }

          return (
            <>
              <h1 className='title'>{company.name}</h1>
              <div className='box'>{company.description}</div>
              <h5 className='title is-5'>Jobs at {company.name}</h5>
              <JobList jobs={company.jobs} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default CompanyDetail;