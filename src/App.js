import React, { useState, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook'
import './reset.css'
import './App.css';
import { fetchTrivia } from './api/fetchTrivia'
import QuestionCard from './components/QuestionCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TOTAL_QUESTIONS = 10;
const INITIAL_TIME = 20 * 1000;
const INTERVAL = 100;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState('')
  const [score, setScore] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [timeLeft, { start, pause }] = useCountDown(INITIAL_TIME, INTERVAL);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchTrivia(TOTAL_QUESTIONS, difficulty);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    start();
  };

  const restartTimer = useCallback(() => {
    start(INITIAL_TIME);
  }, [start])

  const stopTimer = useCallback(() => {
    pause();
  }, [pause])

  useEffect(() => {
    if (timeLeft === 0) {
      checkAnswer();
    }
  }, [timeLeft]) //eslint-disable-line react-hooks/exhaustive-deps

  const checkAnswer = (e) => {
    if (!gameOver) {
      let answer = '';
      let correct = ''
      if (typeof (e) !== 'undefined') {
        answer = e.currentTarget.value;
        correct = questions[number].correct_answer === answer;
        if (correct) setScore(prevScore => prevScore + 1)
        stopTimer();
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject]);
      console.log(score)
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    nextQuestion === TOTAL_QUESTIONS ? setGameOver(true) : setNumber(nextQuestion)
    restartTimer();
  }

  return (
    <div className="app">
      <div className="quiz">
        {!loading && !gameOver &&
          <>
            <CircularProgressbar
              value={(timeLeft / 1000 * 5) - 1}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
              })}
            />
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              category={questions[number].category}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </>}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
          <button className="quiz__button quiz__button--next" onClick={nextQuestion}>   Next Question
          </button>}
        {userAnswers.length === TOTAL_QUESTIONS ? <p className="quiz__score">Score: {score}</p> : null}
      </div>
      {/* {loading && <p className="quiz__loading">Loading Questions...</p>} */}

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className="quiz__button quiz__button--start"
          onClick={startTrivia}>New Game</button>
      ) : null}
    </div>
  );
}

export default App;
