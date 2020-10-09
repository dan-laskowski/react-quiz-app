import React from 'react'

export function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar">
      <Filler percentage={percentage} />
    </div>
  )
}

export function Filler({ percentage }) {
  return (
    <div className="filler" style={{ width: `${percentage}%` }} />
  )
}



