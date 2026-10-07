import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// GitHub Pages SPA fallback: public/404.html stores the requested deep link, restore it here.
try {
  const redirect = sessionStorage.getItem('spa-redirect');
  if (redirect) {
    sessionStorage.removeItem('spa-redirect');
    window.history.replaceState(null, '', redirect);
  }
} catch {
  /* sessionStorage unavailable */
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
