import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import Container from './Container'
import css from '../styles.scss'
import { FaGoogle, FaMicrophoneAlt } from 'react-icons/fa'

import dynamic from "next/dynamic";
const Player = dynamic(() => import('./Player'), {
  ssr: false
});

const menuArr = [{
  label: 'Home',
  url: '/'
},
// {
//   label: 'Merch',
//   url: '/merch'
// }, {
//   label: 'Events',
//   url: '/events'
// }
]

export default ({ children, user, title, router }) => {
  return (
    <>
      <Head>
        <title>{title || 'Marketing podcast'}</title>
      </Head>
      <div className={css.layout}>
        <div className={css.navigation}>
          <div className={css.navigation__inner}>
            <ul className={css.menu}>
              {menuArr.map((menu, i) => (
                <li
                  className={[css.menu__item, (menu.url === router.asPath) ? css['menu__item--active'] : ''].join(' ')}
                  key={i}
                >
                  <Link href={menu.url}><a>{menu.label}</a></Link>
                </li>
              ))}
            </ul>

            <ul className={css.menu}>
              {!user ? (
                <li className="menu__item">
                  <Link href="/auth/google">
                    <a
                      className={[css['button'], css['button--icon'], css['button--md'], css['button--google']].join(' ')}
                    >
                      <FaGoogle /> Sign In
                    </a>
                  </Link>
                </li>
              ) : (
                <>
                  <li className={[css['menu__item'], css['dropdown']].join(' ')}>
                    <a>
                      <span className={css.avatar}>
                        <img src={user.photo.url} alt=""/>
                      </span>
                      {user.firstName}
                    </a>

                    <ul className={css['dropdown-menu']}>
                      <li>
                        <Link href="/profile">
                          <a>Profile</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/logout" prefetch={false}>
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

          {(user && (user.level < 2)) && (router.asPath !== '/publish') ? (
            <Link href="/publish">
              <a
                className={[css['button'], css['button--primary'], css['button--float']].join(' ')}
              >
                <FaMicrophoneAlt /> <span>Broadcast now!</span>
              </a>
            </Link>
          ) : ''}
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
}

