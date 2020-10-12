import React from 'react'

export default function ScorePane({ score, completion, totalQuestions, startGame, setShowScore, setGameOver, setUserAnswers }) {
  return (
    <div>
      <div>
        <h1 className="quiz__main-score">Your score: {score * 10} pt</h1>
        <h1 className="quiz__score-completion">Completion: {Math.round(completion / totalQuestions * 100)}%</h1>
        <h1 className="quiz__score-total">Total Questions: {totalQuestions}</h1>
        <h1 className="quiz__score-completion">Correct: {score}</h1>
        <h1 className="quiz__score-completion">Wrong: {totalQuestions - score}</h1>
        <button className="quiz__button-play" onClick={startGame}>Try Again</button>
        <button className="quiz__button-play" onClick={() => {
          setShowScore(false);
          setGameOver(true);
          setUserAnswers([]);
        }}>New Game</button>
      </div>
    </div>
  )
}
