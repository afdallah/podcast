import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';

import { server } from '../config';
import Layout from '../components/Layout';
import EpisodeCard from '../components/EpisodeCard';
import Flex from '../components/Flex';

import { classNames } from '../helpers';

const clsHeading = classNames({
  heading: true,
  'heading--xl': true,
});

let cache = {};
const Index = props => {
  if (process.browser) {
    cache.episodes = props.episodes;
  }

  return (
    <>
      <h1 className={clsHeading}>{ props.episodes.length ? 'latest' : 'No episode found, create on!'}</h1>
      <Flex>
        {props.episodes
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .map((episode, index) => {
            return <EpisodeCard key={episode._id} {...episode} index={index} />;
          })}
      </Flex>
    </>
  );
};

Index.getInitialProps = async function() {
  let data;

  if (cache.episodes) {
    data = cache.episodes;
  } else {
    const res = await fetch(`${server}/api/episode`);
    data = await res.json();
  }

  return { episodes: data };
};

export default Index;
