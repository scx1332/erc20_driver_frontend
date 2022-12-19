import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from "./Dashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div>
          <Dashboard/>
      </div>
  </React.StrictMode>
);

