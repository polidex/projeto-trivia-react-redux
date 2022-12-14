import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetStore, saveUserInfo } from '../redux/actions';
// import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetStore());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then(({ token }) => {
        const { history, dispatch } = this.props;
        dispatch(saveUserInfo(this.state));
        localStorage.setItem('token', token);
        history.push('/game');
      });
  }

  validateLogin = () => {
    const { name, email } = this.state;
    return !(name.length && email.length);
  }

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
        <section>
          <form className="form">
            <input
              type="text"
              className="name-input"
              data-testid="input-player-name"
              placeholder="name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              type="email"
              className="email-input"
              data-testid="input-gravatar-email"
              placeholder="e-mail"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </form>
          <button
            type="button"
            disabled={ this.validateLogin() }
            onClick={ this.handleClick }
            className="login-button"
            data-testid="btn-play"
          >
            PLAY
          </button>
        </section>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          SETTINGS
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
