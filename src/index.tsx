import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from "./Dashboard";
import {ConfigProvider} from "./ConfigProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ConfigProvider>
          <div>
              <Dashboard/>
          </div>
      </ConfigProvider>
  </React.StrictMode>
);

