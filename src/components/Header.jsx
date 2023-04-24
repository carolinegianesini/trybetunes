import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
