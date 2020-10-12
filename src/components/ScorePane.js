import React, { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CountUp from 'react-countup'

export default function ScorePane({ score, completion, totalQuestions, startGame, setShowScore, setGameOver, setUserAnswers }) {

  return (
    <div>
      <div className="scoreboard">
        <div className="progress-bar">
          <CircularProgressbar
            value={score / totalQuestions * 100}
            text={`${score * 10}pt`}
            strokeWidth={6}
            styles={buildStyles({
              pathColor: "#081c82",
              textColor: "#081c82"
            })}
          />
        </div>
        <h1 className="quiz__main-score">{`You earned `}<CountUp
          end={Math.round(score / totalQuestions * 100)}
          duration={4}
        />
        % of possible points</h1>
        <h1 className="quiz__score-total">Total Questions: {totalQuestions}</h1>
        <h1 className="quiz__score-completion">Completion:
        <CountUp
            end={Math.round(completion / totalQuestions * 100)}
            delay={2}
            duration={4}
          />%
        </h1>
        <h1 className="quiz__score-completion">Correct:
        <CountUp
            end={score}
            delay={5}
            duration={3}
          /></h1>
        <h1 className="quiz__score-completion">Wrong:
        <CountUp
            end={totalQuestions - score}
            delay={7}
            duration={3}
          /></h1>
        <button className="quiz__button" onClick={startGame}>Try Again</button>
        <button className="quiz__button" onClick={() => {
          setShowScore(false);
          setGameOver(true);
          setUserAnswers([]);
        }}>New Game</button>
      </div>
    </div >
  )
}
