import Link from 'next/link'
import Head from 'next/head'
import Container from './Container'
import css from '../styles.scss'
import { FaGoogle, FaTelegramPlane } from 'react-icons/fa'

import dynamic from "next/dynamic";
const Player = dynamic(() => import('./player'), {
  ssr: false
});

export default ({ children, user, title }) => (
  <>
    <Head>
      <title>{title || 'Marketing podcast'}</title>
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
          </ul>

          <ul className={css.menu}>
            {!user ? (
              <li className="menu__item">
                <Link href="/auth/google">
                  <a
                    className={[css['button'], css['button-icon'], css['button-md']].join(' ')}
                  >
                    <FaGoogle /> Sign In
                  </a>
                </Link>
              </li>
            ) : (
              <>
                {(user.level < 2) && (
                  <li className={css.menu__item}>
                    <Link href="/publish"><a><FaTelegramPlane />Publish</a></Link>
                  </li>
                )}
                <li className={[css['menu__item'], css['dropdown']].join(' ')}>
                  <a>
                    {user.displayName}
                  </a>

                  <ul className={css['dropdown-menu']}>
                    <li>
                      <Link href="/profile">
                        <a>Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/logout">
                        <a>Logout</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
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