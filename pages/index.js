import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'

import {server} from '../config'
import Layout from '../components/layout'
import EpisodeCard from '../components/episodeCard'
import Flex from '../components/flex'

import 'normalize.css'
import css from '../styles.scss'

// let cache = {}
const Index = (props) => {
  // if (process.browser) {
  //   cache.episodes = props.episodes
  // }

  return  (
    <Layout>
      <h1 className={`${css.heading} ${css.headingXl}`}>Podcasts</h1>
      <Flex>
        {props.episodes.map((episode, index) => {
          return <EpisodeCard key={episode._id} {...episode} index={index} />
        })}
      </Flex>
    </Layout>
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