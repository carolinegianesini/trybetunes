import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  addMusic = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const teste = await addSong(trackId);
    console.log(teste);
    this.setState({
      loading: false,
      checked: true,
    });
  };

  render() {
    // const { musicList } = this.props;
    const { trackId, previewUrl, trackName } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <h3>{trackName}</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <form>
                <label
                  htmlFor={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                >
                  Favorita
                </label>
                <input
                  type="checkbox"
                  name={ previewUrl }
                  id={ trackId }
                  onChange={ this.addMusic }
                  checked={ checked }
                />
              </form>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.array,
}.isRequired;

export default MusicCard;
