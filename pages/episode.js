import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import css from '../styles.scss'

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("rich-markdown-editor"), {
  ssr: false
});

import { dark } from "../helpers";
import Layout from '../components/layout'
import { server } from '../config'

const Episode = (props) => {
  return (
    <>
      <h1>{props.data.title}</h1>
      {/* <h3><span className="badge badge-primary">{props.data.author}</span></h3> */}
      <img className={css.image} src={props.data.image.url} alt=""/>
      <Editor dark={true} theme={dark} defaultValue={props.data.content} readOnly />
    </>
  )
}

Episode.getInitialProps = async ({ store, isServer, pathname, query }) => {
  const res = await fetch(`${server}/api/episode/${query.id}`)
  const data = await res.json();
  store.dispatch({ type: 'CHANGE_PODCAST', payload: data.audio })

  return { data }
}
export default Episode