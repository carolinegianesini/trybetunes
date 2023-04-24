import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';

class Header extends Component {
  state = {
    loadingHeader: false,
    user: '',
  };

  componentDidMount() {
    this.recuperaNome();
  }

  recuperaNome = async () => {
    this.setState({
      loadingHeader: true,
    });
    const nomeUsuario = await getUser();
    const { name } = nomeUsuario;
    this.setState({
      loadingHeader: false,
      user: name,
    });
  };

  render() {
    const { loadingHeader, user } = this.state;
    return (
      <header data-testid="header-component">
        HEADER
        {
          loadingHeader
            ? <Loading />
            : <h2 data-testid="header-user-name">{ user }</h2>
        }
        <nav>
          <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorite Musics
            </Link>
          </li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        </nav>
      </header>
    );
  }
}

export default Header;
