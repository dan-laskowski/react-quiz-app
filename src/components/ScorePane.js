import React from 'react'
import CountUp, { useCountUp } from 'react-countup'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export default function ScorePane({ score, completion, totalQuestions, startGame, setShowScore, setGameOver, setUserAnswers }) {

  const PROGRESSBAR_DURATION = 3;

  const { countUp } = useCountUp({ end: score / totalQuestions * 100, duration: PROGRESSBAR_DURATION })
  return (
    <div>
      <div className="scoreboard">
        <h1 className="scoreboard__title">Result</h1>
        <div className="progress-bar">
          <CircularProgressbarWithChildren
            value={countUp}
            strokeWidth={6}
            styles={buildStyles({
              pathColor: score === totalQuestions ? "#FFD700" : "#ec6e4c",
              textColor: "#081c82"
            })}
          >
            <CountUp
              className="scoreboard__progresbar-text"
              end={score * 10}
              duration={PROGRESSBAR_DURATION}
              suffix={'pt'} />
          </CircularProgressbarWithChildren>
        </div>
        <h1 className="quiz__main-score">{`You earned `}<CountUp
          end={Math.round(score / totalQuestions * 100)}
          duration={3}
        />
        % of possible points</h1>
        <ul className="quiz__list">
          <li>
            <h1 className="quiz__score">
              <CountUp
                end={Math.round(completion / totalQuestions * 100)}
                delay={2}
                duration={3}
              />%
        </h1>
            <p className="quiz__score-paragraph">Completion</p>
          </li>
          <li>
            <h1 className="quiz__score">{totalQuestions}</h1>
            <p className="quiz__score-paragraph">Total Questions</p>
          </li>
          <li className="quiz__score--correct">
            <h1 className="quiz__score quiz__score--correct">
              <CountUp
                end={score}
                delay={5}
                duration={1}
              /></h1>
            <p className="quiz__score-paragraph">Correct</p>
          </li>
          <li className="quiz__score--wrong">
            <h1 className="quiz__score quiz__score--wrong">
              <CountUp
                end={totalQuestions - score}
                delay={6}
                duration={1}
              /></h1>
            <p className="quiz__score-paragraph">Wrong</p>
          </li>
        </ul>
        <div className="quiz__button-container">
          <button className="quiz__button quiz__button--try-again" onClick={startGame}>Try Again</button>
          <button className="quiz__button quiz__button--endgame" onClick={() => {
            setShowScore(false);
            setGameOver(true);
            setUserAnswers([]);
          }}>New Game</button>
        </div>
      </div>
    </div >
  )
}
