import React from 'react'

export default function QuestionCard({
  question,
  answers,
  category,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) {

  return (
    <div className="question-card">
      <p className="question-card__category">{category}</p>
      <p className="question-card__number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p
        className="question-card__question"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="question-card__answers">
        {answers.map(answer => (
          <div className="question-card__button-container" key={answer}>
            <button
              className={
                `question-card__button 
                ${!!userAnswer ? (
                  userAnswer.correctAnswer === answer ? `question-card__button--correct` : `question-card__button--wrong`
                ) : null}`
              }

              disabled={!!userAnswer}
              value={answer}
              onClick={callback}>
              <p dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
