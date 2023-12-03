import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';



function App() {
  const [res, setRes] = useState(null);
  const [user, setUser] = useState(null);

  const makeReq = (path, set=setRes) => {
    axiosInstance.get(path).then((res) => {
      set(res.data);
    }).catch((err) => {
      alert(err);
    });
  }

  const getUser = () => {
    makeReq('/user', setUser);
  }

  const login = () => {
    makeReq('/login');
  }

  const logout = () => {
    makeReq('/logout');
    setUser(null);
  }

  useEffect(() => {
    makeReq('/');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span
          className="App-link"
        >
          Res: {res} <br />
          User: {user ? user.user.id : 'Not logged in'}
        </span>
        <div className='button-container'>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button>
          <button onClick={getUser}>get User</button>
        </div>
      </header>
    </div>
  );
}

export default App;
