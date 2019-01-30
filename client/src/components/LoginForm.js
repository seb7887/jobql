import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { loginMutation } from '../libs/mutations';

const accessTokenKey = 'accessToken';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: false };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  completed() {
    this.props.history.push('/');
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <Mutation
        mutation={loginMutation}
        variables={{ input: { email, password } }}
      >
        {(login, { data }) => (
          <form
            onSubmit={async e => {
              e.preventDefault();
              const { data: { me: { token } } } = await login();
              if (token) {
                localStorage.setItem(accessTokenKey, token);
                this.props.onLogin();
                this.completed();
              } else {
                this.setState({ error: true });
              }
            }}
          >
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="text" name="email" value={email}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" name="password" value={password}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <p className="help is-danger">{error && 'Invalid credentials'}</p>
              <div className="control">
                <button className="button is-link" type="submit">Login</button>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}

// To access this.props.history we must pass it to withRouter HOC
export default withRouter(LoginForm);