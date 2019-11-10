import React from 'react'
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
            className="media-wrapper"
          >
            <Player
              ref={c => (this._player = c)}
              src={this.props.player.nowPlaying}
              className="media-player"
            />
            <div className="media-controls">
              <PlayPause className="media-control media-control--play-pause" />
              <CurrentTime className="media-control media-control--current-time" />
              <SeekBar className="media-control media-control--volume-range" />
              <Duration className="media-control media-control--duration" />
              <MuteUnmute className="media-control media-control--mute-unmute" />
              <Volume className="media-control media-control--volume" />
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