import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Header from './layout/Header';
import UserContext from './context/UserContext';

import './App.css';
import Axios from 'axios';

function App() {

  const [userData, setUserData] = useState({
    token: '',
    user: '',
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post('http://localhost:5000/users/tokenIsValid', null,
        { headers: { "x-auth-token": token } });

      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data,
        })
      }
    };

    checkLoggedIn();
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
