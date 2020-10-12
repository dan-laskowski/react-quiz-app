import React from 'react'

export default function StartGamePane({ setDifficulty, setCategory, startGame }) {

  const handleRadioChange = (e) => {
    setDifficulty(e.currentTarget.value)
  }
  const handleCategorySelect = (e) => {
    setCategory(e.currentTarget.value)
  }
  return (
    <div className="start-game">
      <h1 className="start-game__title">Quiz App</h1>
      <div className="start-game__selectors">
        <h2 className="start-game__select-title">Select category</h2>
        <select onChange={handleCategorySelect} name="category" className="start-game__select">
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>
        <h2 className="start-game__select-title">Select difficulty</h2>
        <div className="start-game__radio-group">
          <label htmlFor="easy" className="start-game__radio-label">
            <input
              id="easy"
              type="radio"
              className="start-game__radio"
              name="difficulty"
              value="easy"
              defaultChecked
              onChange={handleRadioChange}
            /> Easy
        </label>
          <label htmlFor="medium" className="start-game__radio-label">
            <input
              id="medium"
              type="radio"
              className="start-game__radio"
              name="difficulty"
              value="medium"
              onChange={handleRadioChange}
            /> Medium
        </label>
          <label htmlFor="hard" className="start-game__radio-label">
            <input
              id="hard"
              type="radio"
              className="start-game__radio"
              name="difficulty"
              value="hard"
              onChange={handleRadioChange}
            /> Hard
        </label>
        </div>
      </div>
      <button
        className="quiz__button quiz__button--start"
        onClick={startGame}>New Game</button>
    </div>
  )
}
