import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const number = 3;
    return (
      <main>
        <Header />
        <h1>Feedback</h1>
        <div>
          <p data-testid="feedback-text">
            {assertions < number ? 'Could be better...' : 'Well Done!'}
          </p>
          <p>
            Você acertou
            {' '}
            <span
              data-testid="feedback-total-question"
            >
              {assertions}
            </span>
            {' '}
            questões!
          </p>
          <p>
            Total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos!
          </p>
        </div>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
