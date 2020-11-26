import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostsContainer from './components/posts/posts-container';
import SignIn from './components/auth/sign-in';
import SignUp from './components/auth/sign-up';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createStore } from './store';
import PrivateRoute from './private-route';
import API from './api/api';

// Define the main app
const App = ({ store }) => {
  const user = store.get('user');
  if (!user) {
    API.get('auth/me').then(({ data }) => {
      store.set('user', data);
    }).catch(() => {
      store.set('user', {});
    });
    return null;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit
          {' '}
          <code>
            src/App.jsx
          </code>
          {' '}
          and save to reload.
        </p>
        <div className="container">
          <div>
            <PrivateRoute exact path="/" component={PostsContainer} />
            <Route path="/sign_in" component={SignIn} />
            <Route path="/sign_up" component={SignUp} />
          </div>
        </div>
      </div>
    </Router>
  );
};

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired
};

export default createStore(App);
