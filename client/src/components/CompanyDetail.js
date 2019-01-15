import React from 'react';
import JobList from './JobList';
import { loadCompany } from '../libs/request';

class CompanyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null
    }
  }

  componentDidMount = async () => {
    const { companyId } = this.props.match.params;
    const company = await loadCompany(companyId);
    this.setState({ company: company });
  }

  render() {
    const { company } = this.state;
    if (!company) return null;
    return (
      <>
        <h1 className='title'>{company.name}</h1>
        <div className='box'>{company.description}</div>
        <h5 className='title is-5'>Jobs at {company.name}</h5>
        <JobList jobs={company.jobs} />
      </>
    );
  }
}

export default CompanyDetail;
