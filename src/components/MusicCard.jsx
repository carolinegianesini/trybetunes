import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  async componentDidMount() {
    const allMusics = await getFavoriteSongs();
    const { trackId } = this.props;
    const favoriteMusic = allMusics.some((music) => music.trackId === trackId);
    if (favoriteMusic) {
      this.setState({
        checked: true,
      });
    }
  }

  addMusicFunc = async () => {
    const { trackId, trackName, previewUrl, funcaoTeste } = this.props;
    const { checked } = this.state;
    this.setState({
      loading: true,
    });
    if (checked === false) {
      await addSong({ trackId, trackName, previewUrl });
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong({ trackId, trackName, previewUrl });
      await funcaoTeste();
      this.setState({
        loading: false,
        checked: false,
      });
    }
  };

  render() {
    const { trackId, previewUrl, trackName } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <p>{trackName}</p>
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
                  <input
                    type="checkbox"
                    name={ previewUrl }
                    id={ trackId }
                    onChange={ this.addMusicFunc }
                    checked={ checked }
                  />
                </label>
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
