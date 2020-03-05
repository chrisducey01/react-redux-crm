import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserLogin } from './store/user';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();

  //check if user is logged in
  useEffect(() => {
    axios.get('/auth/user').then(response => {
      if (!!response.data.user) {
        dispatch(updateUserLogin(true, response.data.user));
      } else {
        dispatch(updateUserLogin(false, {}));
      }
    })
  });

  const logout = (event) => {
    event.preventDefault()
    axios.post('/auth/logout').then(response => {
      if (response.status === 200) {
        dispatch(updateUserLogin(false, {}))
      }
    })
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" redirect="/login">
            <header className="App-header">
              <button type="button" onClick={logout}>Logout</button>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </PrivateRoute>
          <Route exact path="/signup">
            <AddUser />
          </Route>
          <Route exact path="/login">
            <LoginUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
