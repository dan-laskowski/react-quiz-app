import React from 'react'

export default function QuestionCard({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) {
  return (
    <div className="question-card">
      <p className="question-card__number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p
        className="question-card__question"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="card__answers">
        {answers.map(answer => (
          <div key={answer}>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
