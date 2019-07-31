import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'

const Episode = (props) => {
  return (
    <Layout>
      <h1>{props.data.title}</h1>
      <h3><span className="badge badge-primary">{props.data.author}</span></h3>
      <img className="img-responsive" src={props.data.image.url} alt=""/>
      <div>{props.data.content}</div>
    </Layout>
  )
}

Episode.getInitialProps = async function ({ store, isServer, pathname, query }) {
  const res = await fetch(`http://localhost:3000/api/episode/${query.id}`)
  const data = await res.json();
  store.dispatch({ type: 'CHANGE_PODCAST', payload: data.audio })

  return { data }
}
export default Episode