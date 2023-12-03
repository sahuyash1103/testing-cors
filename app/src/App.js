import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosInstance.get('/').then((res) => {
      setData(res.data);
    });
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
          DATA: {data}
        </span>
      </header>
    </div>
  );
}

export default App;
