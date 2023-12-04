import React from 'react';
import logo from './logo.svg';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './shared/i18n';
import { Home } from './components/home'

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Home />
      </I18nextProvider>
    </>
  );
}

export default App;
