import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
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
    const { name, score, assertions } = this.props;
    const number = 3;
    return (
      <main>
        <h1>Feedback</h1>
        <div>
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
          <p
            data-testid="header-score"
          >
            {score}
          </p>
          <p data-testid="feedback-text">
            {assertions < number ? 'Could be better...' : 'Well Done!'}
          </p>
        </div>
      </main>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
