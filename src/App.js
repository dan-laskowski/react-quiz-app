import React, { useState, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook'
import './reset.css'
import './App.css';
import { fetchTrivia } from './api/fetchTrivia'
import QuestionCard from './components/QuestionCard'
import { ProgressBar } from './components/ProgressBar'

const TOTAL_QUESTIONS = 10;
const INITIAL_TIME = 30 * 1000;
const INTERVAL = 1000;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [timeLeft, { start, pause }] = useCountDown(INITIAL_TIME, INTERVAL);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchTrivia(TOTAL_QUESTIONS, 'easy');
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    start();
  };

  const restartTimer = useCallback(() => {
    start(INITIAL_TIME);
  }, [])

  const stopTimer = useCallback(() => {
    pause();
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      checkAnswer();
    }

  }, [timeLeft])

  const checkAnswer = (e) => {
    if (!gameOver) {
      let answer = '';
      const correct = questions[number].correct_answer === answer;
      if (typeof (e) !== 'undefined') {
        stopTimer();
        answer = e.currentTarget.value;
        if (correct) setScore(prevScore => prevScore + 1)
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject]);
      console.log(timeLeft)
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    nextQuestion === TOTAL_QUESTIONS ? setGameOver(true) : setNumber(nextQuestion)
    restartTimer();
  }

  return (
    <div className="app">
      <h1 className="quiz__title">Quiz App</h1>

      <div className="quiz">
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button
            className="quiz__button quiz__button--start"
            onClick={startTrivia}>New Game</button>
        ) : null}
        {loading && <p className="quiz__loading">Loading Questions...</p>}
        {!loading && !gameOver &&
          <>
            <ProgressBar timeLeft={timeLeft} />
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </>}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
          <button
            className="quiz__button quiz__button--next"
            onClick={nextQuestion}
          >Next Question</button>}
        {userAnswers.length === TOTAL_QUESTIONS ? <p className="quiz__score">Score: {score}</p> : null}
      </div>
    </div>
  );
}

export default App;
