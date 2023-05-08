import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import { Loading } from '../components/Loading';

class Profile extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const infosUser = await getUser();
    const { name, email, image, description } = infosUser;
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {loading
            ? <Loading />
            : (
              <div>
                <img src={ image } alt="Foto de perfil" data-testid="profile-image" />
                <h3>Nome</h3>
                <p>{name}</p>
                <h3>E-mail</h3>
                <p>{email}</p>
                <h3>Descrição</h3>
                <p>{description}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>

      </div>
    );
  }
}

export default Profile;
