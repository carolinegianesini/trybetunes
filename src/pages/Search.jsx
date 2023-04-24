import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    disabled: true,
    artist: '',
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

  render() {
    const { disabled, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artist"
            id="artist"
            value={ artist }
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
