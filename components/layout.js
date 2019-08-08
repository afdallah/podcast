import Link from 'next/link'
import Head from 'next/head'
import Container from './container'
import css from '../styles.scss'

import dynamic from "next/dynamic";
const Player = dynamic(() => import('./player'), {
  ssr: false
});

export default ({ children }) => (
  <>
    <Head>
      <title>Podcastnya babang tamvan</title>
    </Head>
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.navigation__inner}>
          <ul className={css.menu}>
            <li className={css.menu__item}>
              <Link href="/"><a>Home</a></Link>
            </li>
            {/* <li className={css.menu__item}><a>Events</a></li>
            <li className={css.menu__item}><a>Merch</a></li> */}
            <li className={css.menu__item}>
              <Link href="/publish"><a>Publish</a></Link>
            </li>
          </ul>

          <ul className={css.menu}>
            <li className="menu__item">
              <Link href="/auth/google">
                <a>Sign in Google</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Container>
        {children}
      </Container>
      {/* Footer */}
      <div className={css['fixed-bottom']}>
        <Container>
          <Player />
        </Container>
      </div>
    </div>
  </>
)
