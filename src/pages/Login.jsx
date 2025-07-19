import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import { Loading } from '../components/Loading';

class login extends Component {
  state = {
    nome: '',
    disabled: true,
    loading: false,
  };

  validateCharacters = () => {
    const { nome } = this.state;
    const minLength = 3;
    if (nome.length >= minLength) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateCharacters);
  };

  enterButton = async (nome) => {
    const { alteraLogado } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: nome });
    alteraLogado();
    this.setState({
      loading: false,
    });
  };

  render() {
    const { nome, disabled, loading } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        {loading ? <Loading />
          : (
            <form className="login-form">
              <label htmlFor="nome" className="login-label">
                Digite seu nome:
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={ nome }
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  className="login-input"
                />
              </label>
              <button
                type="button"
                disabled={ disabled }
                data-testid="login-submit-button"
                onClick={ () => this.enterButton(nome) }
                className="login-button"
              >
                Entrar
              </button>
            </form>)}
      </div>
    );
  }
}

login.propTypes = {
  alteraLogado: PropTypes.func,
}.isRequired;

export default login;
