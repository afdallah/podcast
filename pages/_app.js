import App from 'next/app'
import React from 'react'
import { compose } from 'redux'
import withRedux from 'next-redux-wrapper'

import makeStore from '../store'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import Soon from '../pages/soon'
import TerimaKasih from '../pages/terima-kasih'

import 'normalize.css'

class MyApp extends App {
  static async getInitialProps({ Component, ctx, ...props }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.user;
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user,
      router: props.router
    };
  }

  render() {
    const { Component, pageProps, store } = this.props
    const comingSoon = false

    const props = {
      ...pageProps,
      user: this.state.user,
    }

    return (
        <Provider store={store}>
          {
            (() => {
              if (comingSoon) {
                if (this.props.router.asPath === '/terima-kasih') {
                  return <TerimaKasih />
                } else {
                  return <Soon />
                }
              } else {
                return (
                  <Layout user={this.state.user} router={{...this.state.router}}>
                    <Component {...props} user={this.state.user} />
                  </Layout>
                )
              }
            })()
          }
        </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp)
