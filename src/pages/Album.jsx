import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musics: [],
    album: {},
  };

  componentDidMount() {
    this.getMusicsList();
  }

  getMusicsList = async () => {
    const { match: { params: { id } } } = this.props;
    const musicslist = await getMusics(id);
    this.setState({
      musics: musicslist.slice(1),
      album: musicslist[0],
    });
  };

  render() {
    const { musics, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <p data-testid="album-name">{ album.collectionName }</p>
        <p data-testid="artist-name">{ album.artistName }</p>
        <MusicCard
          musicList={ musics }
          // trackName={ musics.trackName }
          // previewUrl={ musics.previewUrl }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
