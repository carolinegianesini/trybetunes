import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicList } = this.props;
    return (
      <div>
        {musicList.map((music) => (
          <div key={ music.trackName }>
            <h3>{ music.trackName }</h3>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.array,
}.isRequired;

export default MusicCard;
