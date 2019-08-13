import App, { Container as NextContainer } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import makeStore from '../store'
import { Provider } from 'react-redux'
import Layout from '../components/layout'

import 'normalize.css'

class MyApp extends App {
  static async getInitialProps({ Component, ctx, ...props }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  render() {
    const { Component, pageProps, store } = this.props

    const props = {
      ...pageProps,
      user: this.state.user,
    }

    return (
      <NextContainer>
        <Provider store={store}>
          <Layout user={this.state.user}>
            <Component {...props} user={this.state.user} />
          </Layout>
        </Provider>
      </NextContainer>
    )
  }
}

export default withRedux(makeStore)(MyApp)
