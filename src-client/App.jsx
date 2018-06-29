import React from 'react';
import PostsContainer from './components/posts/posts-container';

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';

// Define the main app
const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">
        Welcome to React. This demo was modified to include &lt;POSTS&gt; module
      </h1>
    </header>
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
      <PostsContainer />
    </div>
  </div>
);

export default App;
