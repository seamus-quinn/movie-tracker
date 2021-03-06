import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchUsers, fetchFavorites } from '../../apiCalls';
import { 
  updateCurrentUser, 
  updateMovies, 
  updateFavorites 
} from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { cleanFavorites } from '../../cleaner';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      id: null,
      verified: false,
      loginError: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  verifyUser = async () => {
    const { email, password } = this.state;
    const users = await fetchUsers();
    const userMatch = users.find(user => {
      return user.password === password && user.email === email;
    });

    if (userMatch) {
      this.setState({ loginError: '' });
      return userMatch.id;
    } else {
      this.setState({ loginError: 'Invalid email or password' });
      return undefined;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const id = await this.verifyUser();
    if (id) {
      this.props.updateCurrentUser(id);
      const fetchedFavorites = await fetchFavorites(id);
      const cleanedFavorites = cleanFavorites(fetchedFavorites); 
      this.props.updateFavorites(cleanedFavorites);
      this.props.updateMovies(cleanedFavorites);
      this.setState({ id, verified: true });
    } 
  };

  render() {
    if (this.state.verified) {
      return <Redirect to='/' />;
    }

    return (
      <div className='login'>
        <form
          type='submit'
          onSubmit={this.handleSubmit}
        >
          <input 
            type='text'
            placeholder='Email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}          
            required
          />
          <p>{ this.state.loginError }</p>
          <button>Log In</button>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (id) => dispatch(updateCurrentUser(id)),
  updateMovies: (favorites) => dispatch(updateMovies(favorites)),
  updateFavorites: (favorites) => dispatch(updateFavorites(favorites))
});

Login.propTypes = {
  updateCurrentUser: PropTypes.func,
  updateMovies: PropTypes.func,
  updateFavorites: PropTypes.func
};

export {
  Login,
  mapDispatchToProps
};

export default connect(null, mapDispatchToProps)(Login);


