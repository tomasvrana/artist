import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { ServerStyleSheet } from 'styled-components'
import App from './App'

export function render(url: string) {
  const sheet = new ServerStyleSheet()
  try {
    const app = (
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    )
    const html = sheet.collectStyles(app)
    const styleTags = sheet.getStyleTags()
    return { html, styleTags }
  } finally {
    sheet.seal()
  }
}
