import React from 'react'
import { TimelineLite, Power3, Expo, TimelineMax } from 'gsap'
import ReactPixel from 'react-facebook-pixel'

import Container from '../components/Container'
import Separator from '../components/Separator'
import css from '../styles.scss'
import { classNames } from '../helpers'
import Flex from 'rich-markdown-editor/lib/components/Flex'

const clsHeading = classNames({
  [css.heading]: true,
  [css['heading--xl']]: true,
  [css['heading--reveal']]: true
})

const style = {
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}

class TerimaKasih extends React.Component {
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
      <div className={css.comingsoon}
        ref={el => this.comingsoon = el}
        style={{
          background: 'url(../static/images/coming-bg.png) no-repeat left top'
        }}>
        <div className={css.spinner} data-anim="spinner">
          <h2 className={css.spinner__label} data-anim="spinner-label">Ngobrol–</h2>
          <img
            className={css.spinner__logo}
            data-anim="spinner-logo"
            src='../static/images/logo.png'
            alt=""
          />
          <div className={css.spinner__bg} data-anim="spinner-bg"></div>
        </div>
        <Container style={style}>
          <div className={css.comingsoon__inner}>
            <h1 className={clsHeading} ref={el => this.heading = el}>
              <span data-anim="heading">Terima kasih</span>
            </h1>
            <Separator />
            <h4 className={css.comingsoon__subheading}>
              <span data-anim="description">Silahkan klik cek email kamu dan klik link konfirmasi</span> <br />
            </h4>
            <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button&size=large&width=77&height=28&appId" height={28} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allow="encrypted-media" />

            <div style={{fontSize: '16px', fontStyle: 'italic', marginTop: '.5em', opacity: .8, lineHeight: 1.6}} data-anim="description">
              Dengan mengklik tombol bagikan/share anda telah membantu teman anda <br />mendapatkan update terbaru tentang internet marketing khususnya facebook ads
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default TerimaKasih