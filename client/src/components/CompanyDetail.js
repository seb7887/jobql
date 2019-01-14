import React from 'react';
import { companies } from '../libs/fake-data';

class CompanyDetail extends React.Component {
  constructor(props) {
    super(props);
    const { companyId } = this.props.match.params;
    this.state = {
      company: companies.find(company => company.id === companyId)
    }
  }

  render() {
    const { company } = this.state;
    return (
      <>
        <h1 className='title'>{company.name}</h1>
        <div className='box'>{company.description}</div>
      </>
    );
  }
}

export default CompanyDetail;
