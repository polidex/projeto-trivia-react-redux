import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({ hash });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Player avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          {' '}
          {name}
          {' '}
        </p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
