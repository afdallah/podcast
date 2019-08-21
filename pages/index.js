import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'

import {server} from '../config'
import Layout from '../components/Layout'
import EpisodeCard from '../components/EpisodeCard'
import Flex from '../components/Flex'

import css from '../styles.scss'

// let cache = {}
const Index = (props) => {
  // if (process.browser) {
  //   cache.episodes = props.episodes
  // }

  return  (
    <>
      <h1 className={`${css.heading} ${css.headingXl}`}>Mulai aja dulu</h1>
      <Flex>
        {props.episodes
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .map((episode, index) => {
            return <EpisodeCard key={episode._id} {...episode} index={index} />
          })
        }
      </Flex>
    </>
  )
}

Index.getInitialProps = async function () {
  // let data

  // if (cache.episodes) {
  //   data = cache.episodes
  // } else {
    const res = await fetch(`${server}/api/episode`)
    const data = await res.json()
  // }

  return { episodes: data }
}

export default Index