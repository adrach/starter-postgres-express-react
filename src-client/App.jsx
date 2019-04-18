import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PostsContainer from './components/posts/posts-container';
import SignIn from './components/auth/sign-in';
import SignUp from './components/auth/sign-up';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createStore } from './store';

// Define the main app
const App = () => (
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
          <Route exact path="/" component={PostsContainer} />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/sign_up" component={SignUp} />
        </div>
      </div>
    </div>
  </Router>
);

export default createStore(App);
