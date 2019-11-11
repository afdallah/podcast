import React from 'react'
import { TimelineLite, Power3, Expo, TimelineMax } from 'gsap'
import Head from 'next/head'

import Container from '../components/Container'
import Separator from '../components/Separator'
import css from '../styles.scss'
import { classNames } from '../helpers'
import Flex from 'rich-markdown-editor/lib/components/Flex'

const clsHeading = classNames({
  'heading': true,
  'heading--xl': true,
  'heading--reveal': true
})

const style = {
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}

class Soon extends React.Component {
  constructor(props) {
    super(props)
    this.comingsoon = null
    this.heading = null
    this.spinner = null
    this.myTween = null
  }

  componentDidMount() {
    const container = this.comingsoon
    const spinner = container.querySelector('[data-anim="spinner"]')
    const label = container.querySelector('[data-anim="spinner-label"]')
    const bg = container.querySelector('[data-anim="spinner-bg"]')
    const logo = container.querySelector('[data-anim="spinner-logo"]')
    const heading = container.querySelector('[data-anim="heading"]')
    const separator = container.querySelector('[data-anim="separator"]')
    const descriptions = container.querySelectorAll('[data-anim="description"]')
    const form = container.querySelectorAll('[data-anim="form"]')

    const spinnerTl = new TimelineMax()

    spinnerTl
      .to(bg, 1, {
        x: '100%',
        ease: Expo.easeInOut,
        delay: .5,
        zIndex: 999
      })
      .to(label, 1, {
        x: '3%',
        ease: Expo.easeInOut,
      }, '-=1')
      .to(logo, 1, {
        opacity: '0',
        ease: Expo.easeInOut,
      })
      .to(logo, 1, {
        scale: '0',
        top: '-100%',
        opacity: '0',
        ease: Expo.easeInOut,
      }, '-=.4')
      .to(spinner, 1, {
        y: '-100%',
        opacity: '.9',
        ease: Expo.easeInOut,
        display: 'none'
      }, '-=1')

    const contentTl = new TimelineMax()
    contentTl
      .from(heading, 1, {
        y: '100px',
        ease: Expo.easeInOut
      })
      .from(separator, 1, {
        width: 0,
        ease: Expo.easeInOut
      }, '-=.5')
      .staggerFrom(descriptions, 1, {
        marginLeft: '-100%',
        opacity: 0,
        ease: Expo.easeInOut
      }, .5, '-=.5')
      .from(form, 1, {
        opacity: '0',
        scale: '2',
        ease: Expo.easeInOut
      }, '-=.5')

      // Master timeline
      const master = new TimelineLite()
      master
        .add(spinnerTl.timeScale(2))
        .add(contentTl.timeScale(2), '-=.5')

      master.play()
  }

  render() {
    return (
      <div className="comingsoon"
        ref={el => this.comingsoon = el}
        style={{
          background: 'url(/static/images/coming-bg.png) no-repeat left top'
        }}>

        <Head>
          <title>Ngobrol.im | Marketing Podcast</title>
          <meta property="og:title" content="Ngobrol.im | Marketing Podcast">
          <meta property="og:site_name" content="Ngobrol.im">
          <meta property="og:url" content="http://ngobrol.im">
          <meta property="og:description" content="Yuk subscribe dan jadi 1000 pendengar pertama">
          <meta property="og:type" content="website">
          <meta property="og:image" content="http://i.imgur.com/ZxioIeh.png">
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1248192601967825');
            fbq('track', 'ViewContent');` }}
          />
        </Head>
        <div className="spinner" data-anim="spinner">
          <h2 className="spinner__label" data-anim="spinner-label">Ngobrol–</h2>
          <img
            className="spinner__logo"
            data-anim="spinner-logo"
            src='/static/images/logo.png'
            alt=""
          />
          <div className="spinner__bg" data-anim="spinner-bg"></div>
        </div>
        <Container style={style}>
          <div className="comingsoon__inner">
            <h1 className={clsHeading} ref={el => this.heading = el}>
              <span data-anim="heading">Coming soon!</span>
            </h1>
            <Separator />
            <h4 className="comingsoon__subheading">
              <span data-anim="description">We resonate Idea, Inspiration, Insight</span> <br />
              <span data-anim="description">straight to your ears</span>
            </h4>

            <div className="newsletter" data-anim="form">
              <form
                className="newsletter__form"
                method="POST"
                action="https://aplikasi.kirim.email/form/125b8472-9f26-4268-ba70-8eeac37bcb96"
              >
                <input
                  type="email"
                  placeholder="Your active email"
                  name="email"
                  className="newsletter__field"
                />
                <input type="submit" className="newsletter__button" value="Subscribe"/>
              </form>
              <div style={{fontSize: '16px', fontStyle: 'italic', marginTop: '.5em', opacity: .8}} data-anim="description">
                Masukan email kamu dan jadilah 1000 pendengar pertama
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default Soon