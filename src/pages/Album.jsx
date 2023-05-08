import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { Loading } from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musics: [],
    album: {},
    loading: false,
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
    const { musics, album, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <p data-testid="album-name">{ album.collectionName }</p>
        <p data-testid="artist-name">{ album.artistName }</p>

        { loading
          ? <Loading />
          : (musics.map((music) => (
            <section key={ music.previewUrl }>
              <MusicCard
                trackId={ music.trackId }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
                funcaoTeste={ () => {} }
              />
            </section>
          )))}
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
