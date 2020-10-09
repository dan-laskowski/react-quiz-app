import axios from 'axios'
import { shuffleArray } from '../utils/shuffleArray'
const URL = `https://opentdb.com/api.php`;


export const fetchTrivia = async (amount, difficulty) => {
  const { data } = await axios.get(URL,
    {
      params:
      {
        amount,
        difficulty,
        type: 'multiple'
      }
    });

  return data.results.map((question) => (
    {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }
  ))
}