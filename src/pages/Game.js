import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { saveScore } from '../redux/actions';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      results: [],
      index: 0,
      classInfo: false,
      timer: 30,
      nextButton: false,
    };
  }

  componentDidMount() {
    this.fetchQuestion();
    this.intervalFunc();
  }

  componentDidUpdate() {
    const { timer, index } = this.state;
    const { history } = this.props;
    const maxIndex = 5;
    if (timer === 0) clearInterval(this.intervalID);
    if (index === maxIndex) history.push('/feedback');
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  intervalFunc = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => this.setState((prev) => ({
      timer: prev.timer - 1,
    })), ONE_SECOND);
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

  handleClick = (answer, dif) => {
    const { timer } = this.state;
    this.setState({ classInfo: true, nextButton: true, timer: 0 });
    const { dispatch } = this.props;
    if (answer === 'right') {
      const points = 10;
      const hard = 3;
      const medium = 2;
      const easy = 1;
      switch (dif) {
      case 'hard':
        dispatch(saveScore(points + (timer * hard)));
        break;
      case 'medium':
        dispatch(saveScore(points + (timer * medium)));
        break;
      case 'easy':
        dispatch(saveScore(points + (timer * easy)));
        break;
      default:
      }
    }
  }

  handleNext = () => {
    this.setState((prev) => ({
      index: prev.index + 1,
      classInfo: false,
      timer: 30,
      nextButton: false,
    }), () => this.intervalFunc());
  }

  render() {
    const { results, classInfo, index, timer, nextButton } = this.state;
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
                              onClick={ () => this.handleClick('right', item.difficulty) }
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
                            onClick={ () => this.handleClick('wrong') }
                            disabled={ timer === 0 }
                          >
                            {question}
                          </button>
                        );
                      })}
                      {nextButton
                      && (
                        <button
                          type="button"
                          data-testid="btn-next"
                          onClick={ this.handleNext }
                        >
                          Next
                        </button>
                      )}
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
