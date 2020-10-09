import React, { useState } from 'react';
import './reset.css'
import './App.css';
import { fetchTrivia } from './api/fetchTrivia'
import QuestionCard from './components/QuestionCard'
import { ProgressBar } from './components/ProgressBar'

const TOTAL_QUESTIONS = 10;


function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchTrivia(TOTAL_QUESTIONS, 'easy');
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prevScore => prevScore + 1)

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

  }

  return (
    <div className="app">
      <h1 className="quiz__title">Quiz App</h1>
      <ProgressBar percentage={number < 9 ? number * 10 : 100} />
      <div className="quiz">
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button
            className="quiz__button quiz__button--start"
            onClick={startTrivia}>New Game</button>
        ) : null}
        {!gameOver ? <p className="quiz__score">Score: {score}</p> : null}
        {loading && <p className="quiz__loading">Loading Questions...</p>}
        {!loading && !gameOver &&
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
          <button
            className="quiz__button quiz__button--next"
            onClick={nextQuestion}
          >Next Question</button>}
      </div>
    </div>
  );
}

export default App;
