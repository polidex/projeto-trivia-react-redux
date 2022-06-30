import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map(({ picture, name, score }, index) => (
          <div key={ picture + index }>
            <img src={ picture } alt="Player avatar" />
            <p data-testid={ `player-name-${index}` }>{name}</p>
            <p data-testid={ `player-score-${index}` }>{score}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Play Again
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
