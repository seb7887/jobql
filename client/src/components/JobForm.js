import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { jobsQuery } from '../libs/queries';
import { jobMutation } from '../libs/mutations';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  completed() {
    this.props.history.push('/');
  }

  render() {
    const { title, description } = this.state;
    return (
      <Mutation
        mutation={jobMutation}
        variables={{ input: { title, description } }}
        refetchQueries={[{ query: jobsQuery }]}
      >
        {(createJob, { loading }) => (
          <div>
            <h1 className="title">New Job</h1>
            <div className="box">
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createJob();
                  console.log(res);
                  this.completed();
                }}
              >
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input className="input" type="text" name="title" value={title}
                      onChange={this.handleChange.bind(this)} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea className="input" style={{ height: '10em' }}
                      name="description" value={description} onChange={this.handleChange.bind(this)} />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-link" type='submit'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(JobForm);