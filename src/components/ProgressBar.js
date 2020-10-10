import React from 'react'

export function ProgressBar({ timeLeft }) {
  return (
    <div className="progress-bar">
      <Filler timeLeft={timeLeft} />
    </div>
  )
}

export function Filler({ timeLeft }) {
  return (
    <div className="filler" style={{ width: `${timeLeft / 1000 * 3.33}%` }} >
      <span className="filler__text">{timeLeft / 1000}</span>
    </div>
  )
}



