import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import Container from './Container'
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
      <div className="layout">
        <div className="navigation">
          <div className="navigation__inner">
            <ul className="menu">
              {menuArr.map((menu, i) => (
                <li
                  className={`menu__item ${(menu.url === router.asPath) ? "menu__item--active" : ''}`}
                  key={i}
                >
                  <Link href={menu.url}><a>{menu.label}</a></Link>
                </li>
              ))}
            </ul>

            <ul className="menu">
              {!user ? (
                <li className="menu__item">
                  <Link href="/auth/google" prefetch={false}>
                    <a
                      className="button button--icon button--md button--google"
                    >
                      <FaGoogle /> Sign In
                    </a>
                  </Link>
                </li>
              ) : (
                <>
                  <li className="menu__item dropdown">
                    <a>
                      <span className="avatar">
                        <img src={user.photo.url} alt=""/>
                      </span>
                      {user.firstName}
                    </a>

                    <ul className="dropdown-menu">
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
                className="button button--primary button--float"
              >
                <FaMicrophoneAlt /> <span>Broadcast now!</span>
              </a>
            </Link>
          ) : ''}
        </Container>
        {/* Footer */}
        <div className="fixed-bottom">
          <Container>
            <Player />
          </Container>
        </div>
      </div>
    </>
  )
}

