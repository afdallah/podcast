import React from 'react'
import css from '../styles.scss'
import { FiPlay } from 'react-icons/fa'
import { Media, Player, controls, utils } from 'react-media-player'
import { connect } from 'react-redux'

import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'


const {
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  Volume,
  Fullscreen,
} = controls

const { keyboardControls } = utils

class AudioPlayer extends React.Component {
  state = {
    pointer: ''
  }

  render () {
    return (
      <Media ref={c => (this.media = c)}>
        {mediaProps => (
          <div
            onKeyDown={keyboardControls.bind(null, mediaProps)}
            className={css['media-wrapper']}
          >
            <Player
              ref={c => (this._player = c)}
              src={this.props.player.nowPlaying}
              className={css["media-player" ]}
            />
            <div className={css['media-controls']}>
              <PlayPause className={[css['media-control'], css['media-control--play-pause']].join(' ')} />
              <CurrentTime className={[css['media-control'], css['media-control--current-time']].join(' ')} />
              <SeekBar className={[css['media-control'], css['media-control--volume-range']].join(' ')} />
              <Duration className={[css['media-control'], css['media-control--duration']].join(' ')} />
              <MuteUnmute className={[css['media-control'], css['media-control--mute-unmute']].join(' ')} />
              <Volume className={[css['media-control'], css['media-control--volume']].join(' ')} />
            </div>
          </div>
        )}
      </Media>
    )
  }
}

const mapStateToProps = function (state) {
  return { player: state }
}

export default connect(mapStateToProps)(AudioPlayer)