import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { isLoggedIn, logout } from './libs/auth';
import NavBar from './components/NavBar';
import CompanyDetail from './components/CompanyDetail';
import LoginForm from './components/LoginForm';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';
import JobBoard from './components/JobBoard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn()
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
    this.router.history.push('/');
  }

  handleLogout = () => {
    logout();
    this.setState({ loggedIn: false });
    this.router.history.push('/');
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <>
          <NavBar loggedIn={loggedIn} onLogout={this.handleLogout} />
          <section className='section'>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={JobBoard} />
                <Route path='/companies/:companyId' component={CompanyDetail} />
                <Route exact path='/jobs/new' component={JobForm} />
                <Route path='/jobs/:jobId' component={JobDetail} />
                <Route exact path='/login' render={() => <LoginForm onLogin={this.handleLogin} />} />
              </Switch>
            </div>
          </section>
        </>
      </Router>
    );
  }
}

export default App;
