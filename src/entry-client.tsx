import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './i18n' // váš i18n setup

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
