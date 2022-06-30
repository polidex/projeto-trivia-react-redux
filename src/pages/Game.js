import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      results: [],
      index: 0,
      classInfo: false,
      timer: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.fetchQuestion();
    this.intervalID = setInterval(() => this.setState((prev) => ({
      timer: prev.timer - 1,
    })), ONE_SECOND);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) clearInterval(this.intervalID);
  }

  fetchQuestion = () => {
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
        const n = 0.5;
        const shuffledResults = results.map((item) => ({
          ...item,
          shuffledQuestions: [...item.incorrect_answers, item.correct_answer]
            .sort(() => Math.random() - n),
        }));
        this.setState({ results: shuffledResults });
      });
  }

  handleClick = () => {
    this.setState({ classInfo: true });
  }

  render() {
    const { results, classInfo, index, timer } = this.state;
    return (
      <>
        <Header />
        <section>
          <p>
            Timer:
            {' '}
            {timer}
          </p>
          {results.length
          && (
            results.map((item, itemIndex) => {
              if (index === itemIndex) {
                return (
                  <div key={ item.question }>
                    <p data-testid="question-category">{item.category}</p>
                    <p data-testid="question-text">{item.question}</p>
                    <div data-testid="answer-options">
                      {item.shuffledQuestions.map((question, qIndex) => {
                        if (item.correct_answer === question) {
                          return (
                            <button
                              type="button"
                              data-testid="correct-answer"
                              key="correct-answer"
                              className={ classInfo ? 'correct-answer' : '' }
                              onClick={ this.handleClick }
                              disabled={ timer === 0 }
                            >
                              {question}
                            </button>
                          );
                        }
                        return (
                          <button
                            key={ `wrong-answer-${qIndex}` }
                            type="button"
                            data-testid={ `wrong-answer-${qIndex}` }
                            className={ classInfo ? 'wrong-answer' : '' }
                            onClick={ this.handleClick }
                            disabled={ timer === 0 }
                          >
                            {question}
                          </button>
                        );
                      })}
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
