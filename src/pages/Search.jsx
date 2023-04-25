import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Loading } from '../components/Loading';

class Search extends Component {
  state = {
    disabled: true,
    artist: '',
    loadingSearch: false,
    artistAlbums: [],
    apiReturn: false,
    artistResults: '',
  };

  validateArtist = () => {
    const { artist } = this.state;
    const minLength = 2;
    if (artist.length >= minLength) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateArtist);
  };

  cleanAndSearch = async () => {
    this.setState({
      loadingSearch: true,
    });
    const { artist } = this.state;
    const findAlbums = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      loadingSearch: false,
      artistAlbums: findAlbums,
      artistResults: artist,
      apiReturn: true,
    });
  };

  render() {
    const { disabled,
      artist, loadingSearch, artistAlbums, apiReturn, artistResults } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loadingSearch
          ? <Loading />
          : (
            <form>
              <label htmlFor="artist">
                Pesquisar artista
                <input
                  type="text"
                  name="artist"
                  id="artist"
                  value={ artist }
                  data-testid="search-artist-input"
                  placeholder="Nome do artista"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disabled }
                onClick={ this.cleanAndSearch }
              >
                Pesquisar
              </button>
            </form>)}
        { artistResults && <p>{`Resultado de álbuns de: ${artistResults}`}</p>}
        <section>
          {apiReturn && artistAlbums.length === 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (artistAlbums.map((album) => (
              <div key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Acessar álbum
                </Link>
              </div>
            )))}
        </section>
      </div>
    );
  }
}

export default Search;
