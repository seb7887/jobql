import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    const { loggedIn, onLogout } = this.props;
    return (
      <nav className='navbar'>
        <div className='navbar-start'>
          <Link className='navbar-item' to='/'>Home</Link>
          {loggedIn &&
            <>
              <Link className='navbar-item' to='/jobs/new'>Post Job</Link>
              <a href='/' className='navbar-item' onClick={onLogout}>Logout</a>
            </>
          }
          {!loggedIn &&
            <>
              <Link className='navbar-item' to='/login'>Login</Link>
            </>
          }
        </div>
      </nav>
    );
  }
}

export default NavBar;