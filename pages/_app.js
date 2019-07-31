import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import makeStore from '../store'

import { Provider } from 'react-redux'

class MyApp extends App {
  render () {
    const { Component, pageProps, store } = this.props
    let base_url
    if (process.browser) {
      base_url = {
        origin: window.location.origin
      }
    }
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} {...base_url} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(MyApp)
