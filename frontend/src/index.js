import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToggleProvider } from "./context/ToggleContext"; 

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('top'));
root.render(
  <React.StrictMode>
    <ToggleProvider> 
      <App />

      <ToastContainer />
    </ToggleProvider>
  </React.StrictMode>
);
