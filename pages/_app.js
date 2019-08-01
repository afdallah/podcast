import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import makeStore from '../store'
import { Provider } from 'react-redux'

import 'normalize.css'

class MyApp extends App {
  render () {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(MyApp)
