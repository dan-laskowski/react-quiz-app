import React, { useState, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook'
import './reset.css'
import './App.css';
import { fetchTrivia } from './api/fetchTrivia'
import QuestionCard from './components/QuestionCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StartGamePane from './components/StartGamePane';
import ScorePane from './components/ScorePane'

const TOTAL_QUESTIONS = 4;
const INITIAL_TIME = 10 * 1000;
const INTERVAL = 100;

function App() {
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState('');
  const [completion, setCompletion] = useState(null);
  const [score, setScore] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [timeLeft, { start, pause }] = useCountDown(INITIAL_TIME, INTERVAL);

  const startTrivia = async () => {
    setLoading(true);
    setShowScore(false);
    setGameOver(false);
    const newQuestions = await fetchTrivia(TOTAL_QUESTIONS, difficulty, category);
    setQuestions(newQuestions);
    setCompletion(0);
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
        if (correct) {
          setScore(prevScore => prevScore + 1)
        }
        setCompletion(prevState => prevState + 1)
        stopTimer();
        e.currentTarget.style.background = '#ED4337'
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject]);
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
        {gameOver
          &&
          <>
            <StartGamePane
              setDifficulty={setDifficulty}
              setCategory={setCategory}
              startGame={startTrivia}
            />
          </>}
        {loading
          ?
          <>
            <div className="quiz__loading">
              <i className="fas fa-spinner fa-spin fa-2x"></i>
              <p>Loading questions...</p>

            </div>
          </>
          : null
        }
        {!loading && !gameOver && !showScore
          &&
          <>
            <CircularProgressbar
              value={(timeLeft / 1000 * 10) - 1}
              strokeWidth={50}
              counterClockwise
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
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1
          &&
          <>
            <button className="quiz__button quiz__button--next" onClick={nextQuestion}>
              Next
            </button>
          </>}
        {userAnswers.length === TOTAL_QUESTIONS && !showScore && !loading
          ?
          <>
            <button className="quiz__show-score" onClick={() => setShowScore(true)}>Show Score</button>
          </>
          :
          null
        }
        {userAnswers.length === TOTAL_QUESTIONS && !loading && showScore
          ?
          <>
            <ScorePane
              score={score}
              completion={completion}
              userAnswers={userAnswers}
              totalQuestions={TOTAL_QUESTIONS}
              startGame={startTrivia}
              setShowScore={setShowScore}
              setGameOver={setGameOver}
              setUserAnswers={setUserAnswers} />
          </>
          : null}
      </div>
    </div >
  );
}

export default App;
