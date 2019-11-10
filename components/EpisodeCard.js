import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'

export default (props) => {
  return (
    <Link
      href={{
        pathname: '/episode',
        query: {
          id: props._id,
        }
      }}

      as={`/episode/${props._id}`}
    >

      <div className="colored-card">
        <div className="colored-shadow" />
        <div className="colored-outline" />
        <div className ="episode-card">
          <div className="episode-head">
            <h3 className="episode-title">{props.title}</h3>
            <h5 className="episode-speaker">{props.host.firstName} {props.host.lastName}</h5>
            <h6 className="episode-speaker-work" > CEO Advertisa</h6>
          </div>

          <div className="episode-footer">
            <div className="play-button">
              <a className="btn btn-primary">
                <img src='../static/images/play-icon.svg' />
              </a>
            </div>

            <div className="episode-speaker-photo">
              <img className="image" src={props.host.photo.url} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}