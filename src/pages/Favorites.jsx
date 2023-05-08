import React, { Component } from 'react';
import Header from '../components/Header';
import { Loading } from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loading: false,
    favoriteMusics: [],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusics,
    });
  }

  funcaoTeste = async () => {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      favoriteMusics,
    });
  };
  // async componentDidUpdate() {
  //   const favoriteMusics = await getFavoriteSongs();
  //   this.setState({
  //     favoriteMusics,
  //   });
  // }

  render() {
    const { loading, favoriteMusics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? <Loading />
          : (favoriteMusics.map((favMusic) => (
            <MusicCard
              key={ favMusic.previewUrl }
              trackId={ favMusic.trackId }
              previewUrl={ favMusic.previewUrl }
              trackName={ favMusic.trackName }
              funcaoTeste={ this.funcaoTeste }
            />
          )))}
      </div>
    );
  }
}

export default Favorites;
