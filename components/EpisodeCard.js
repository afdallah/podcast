import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'

import css from '../styles.scss'

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

      <div className={css.coloredCard}>
        <div className= {css.coloredShadow} />
        <div className={css.coloredOutline} />
        <div className ={css.episodeCard}>
          <div className={css.episodeHead}>
            <h3 className={css.episodeTitle}>{props.title}</h3>
            <h5 className={css.episodeSpeaker}>{props.host.firstName} {props.host.lastName}</h5>
            <h6 className={css.episodeSpeakerWork} > CEO Advertisa</h6>
          </div>

          <div className={css.episodeFooter}>
            <div className={css.playButton}>
              <a className="btn btn-primary">
                <img src='../static/images/play-icon.svg' />
              </a>
            </div>

            <div className={css.episodeSpeakerPhoto}>
              <img className={css.image} src={props.host.photo.url} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}