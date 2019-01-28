import React from 'react';
import { Mutation } from 'react-apollo';
import { loginMutation } from '../libs/mutations';
import { login } from '../libs/request';

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

  handleClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    login({ email, password }).then((token) => {
      if (token) {
        this.props.onLogin();
      } else {
        this.setState({ error: true });
      }
    });
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
        onCompleted={this.completed}
      >
        {(login, { data }) => (
          <form
            onSubmit={async e => {
              e.preventDefault();
              const { data: { me: { token } } } = await login();
              if (token) {
                localStorage.setItem(accessTokenKey, token);
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

export default LoginForm;