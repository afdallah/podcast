import fetch from 'isomorphic-unfetch'
import Head from 'next/head'

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("rich-markdown-editor"), {
  ssr: false
});

import Flex from '../components/Flex'
import { dark } from "../helpers";
import Layout from '../components/Layout'
import { server } from '../config'

const Episode = (props) => {
  return (
    <>
      <Flex style={{marginTop: '3em'}}>
        <Flex.Item span="2">
          <div className="episode-art" style={{overflow: 'hidden', borderRadius: '10px'}}>
            <img className="image" src={props.data.image.url} alt=""/>
          </div>
        </Flex.Item>
        <Flex.Item>
          <h1 style={{marginTop: 0}}>{props.data.title}</h1>
          <hr style={{ border: '1px dashed #fff', opacity: .33 }}/>
          <Flex>
            <Flex.Item style={{display: 'flex', alignItems: 'center'}}>
              <span className="avatar">
                <img src={props.data.host.photo.url} alt="" />
              </span>
              <span>by {props.data.host.displayName}</span>
            </Flex.Item>
            <Flex.Item style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              <img src="../calendar.png" alt="" style={{marginRight: '.5em'}} />
              <span>20 Januari 2010</span>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>

      <Flex style={{marginTop: '3em'}}>
        <Flex.Item>
          <Editor dark={true} theme={dark} defaultValue={props.data.content} readOnly />
        </Flex.Item>
        <Flex.Item span="4">
          <div className="episode-ref">
            <h4 className="episode-ref__title">Link Ketjeh</h4>
            <ul className="episode-ref__list">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
            </ul>
          </div>
        </Flex.Item>
      </Flex>
    </>
  )
}

Episode.getInitialProps = async ({ req, store, isServer, pathname, query, ...props}) => {
  const res = await fetch(`${server}/api/episode/${query.id}`)
  const data = await res.json();
  store.dispatch({ type: 'CHANGE_PODCAST', payload: data.audio })

  return { data }
}
export default Episode