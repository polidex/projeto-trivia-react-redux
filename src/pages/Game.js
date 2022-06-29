import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      results: [],
      index: 0,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        const code = 3;
        if (data.response_code === code) {
          const { history } = this.props;
          localStorage.removeItem('token');
          history.push('/');
        }
        const { results } = data;
        this.setState({ results });
      });
  }

  getElements = (item) => {
    const arr = [
      <button
        type="button"
        key="correct-answer"
        data-testid="correct-answer"
      >
        {item.correct_answer}
      </button>,
    ];
    item.incorrect_answers.forEach((answer, index) => arr.push(
      <button
        key={ `wrong-answer-${index}` }
        type="button"
        data-testid={ `wrong-answer-${index}` }
      >
        {answer}
      </button>,
    ));
    const n = 0.5;
    return arr.sort(() => Math.random() - n);
  }

  trueOrFalse = (item) => {
    const arr = [];
    arr.push(
      <button
        type="button"
        data-testid="wrong-answer-0"
        key="wrong-answer-0"
      >
        {item.incorrect_answers[0]}
      </button>,
    );
    arr.push(
      <button
        type="button"
        data-testid="correct-answer"
        key="correct-answer"
      >
        {item.correct_answer}
      </button>,
    );
    const n = 0.5;
    return arr.sort(() => Math.random() - n);
  }

  render() {
    const { results } = this.state;
    const { index } = this.state;
    return (
      <>
        <Header />
        <section>
          {results.length
          && (
            results.map((item, itemIndex) => {
              if (index === itemIndex) {
                return (
                  <div key={ item.question }>
                    <p data-testid="question-category">{item.category}</p>
                    <p data-testid="question-text">{item.question}</p>
                    <div data-testid="answer-options">
                      {item.type === 'boolean'
                        ? this.trueOrFalse(item).map((tag) => tag)
                        : this.getElements(item).map((button) => button)}
                    </div>
                  </div>
                );
              }
              return '';
            })
          )}
        </section>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
