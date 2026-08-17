import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { I18nProvider } from './lib/i18n';
import './index.css';

/*
  Links handed out before the switch to real paths look like `/#/templates`.
  Rewrite them into the address they meant before the router reads location,
  otherwise every one of them silently lands on the home page.
*/
const legacyHash = window.location.hash;
if (legacyHash.startsWith('#/')) {
  window.history.replaceState(null, '', legacyHash.slice(1) + window.location.search);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      {/*
        Real paths, not `#/…`: everything after a hash stays in the browser and
        never reaches a crawler, so the whole site read as one URL. The rewrite
        that makes this work on Vercel lives in vercel.json.
      */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>,
);
