import React from 'react'
import { TimelineLite, Power3, Expo, TimelineMax } from 'gsap'

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
        form: Expo.easeInOut
      }, .5, '-=.5')
      .from(form, 1, {
        opacity: '0',
        scale: '2',
        form: Expo.easeInOut
      }, '-=.5')

      // Master timeline
      const master = new TimelineLite()
      master
        .add(spinnerTl)
        .add(contentTl, '-=.5')

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
              <span data-anim="heading">Coming soon!</span>
            </h1>
            <Separator />
            <h4 className={css.comingsoon__subheading}>
              <span data-anim="description">We resonance Idea, Inspiration, Insight</span> <br />
              <span data-anim="description">straight to your ear</span>
            </h4>

            <div className={css.newsletter} data-anim="form">
              <form
                className={css.newsletter__form}
                method="POST"
                action="https://aplikasi.kirim.email/form/125b8472-9f26-4268-ba70-8eeac37bcb96"
              >
                <input
                  type="email"
                  placeholder="Your active email"
                  name="email"
                  className={css.newsletter__field}
                />
                <input type="submit" className={css.newsletter__button} value="Subscribe"/>
              </form>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default Soon