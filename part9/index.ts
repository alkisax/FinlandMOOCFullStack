import express from 'express';
const app = express()
import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!')
})

app.get('/bmi', (request, response) => {
  try {
    const height = Number(request.query.height)
    const weight = Number(request.query.weight)

    if (isNaN(height) || isNaN(weight)) {
      response.status(400).send({ error: 'malformatted parameters' })
    }

    const result: string = calculateBmi(height, weight)
    const responseObj = {
      weight: weight,
      height: height,
      bmi: result
    }
    response.status(200).send(responseObj)

  } catch (error: unknown) {
    let errorMessage = 'malformatted parameters'
    if (error instanceof Error) {
      errorMessage += 'error: ' + error.message
    }
    response.status(400).send(errorMessage);
    return;
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})