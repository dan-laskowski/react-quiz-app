import axios from 'axios'
import { shuffleArray } from '../utils/shuffleArray'
const URL = `https://opentdb.com/api.php`;


export const fetchTrivia = async (amount, difficulty, category) => {
  const { data } = await axios.get(URL,
    {
      params:
      {
        amount,
        difficulty,
        category,
        type: 'multiple'
      }
    });
  console.log(difficulty)
  return data.results.map((question) => (
    {
      ...question,
      category: question.category,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),

    }
  ))
}