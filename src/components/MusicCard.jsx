import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  async componentDidMount() {
    const allMusics = await getFavoriteSongs();
    // console.log(allMusics);
    const { trackId } = this.props;
    const favoriteMusic = allMusics.some((music) => music.trackId === trackId);
    // console.log(favoriteMusic);
    if (favoriteMusic) {
      this.setState({
        checked: true,
      });
    }
  }

  addMusicFunc = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(trackId);
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
                  onChange={ this.addMusicFunc }
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
