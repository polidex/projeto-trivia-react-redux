import React from 'react';
// import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  validateLogin = () => {
    const { name, email } = this.state;
    return !(name.length && email.length);
  }

  render() {
    const { email, name } = this.state;
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
              placeholder="email"
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
      </>
    );
  }
}

export default Login;
