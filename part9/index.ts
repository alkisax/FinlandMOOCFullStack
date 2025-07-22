import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { exCalculator, ResultInterface, ReturnedArgsTypes } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  try {
    const height = Number(request.query.height);
    const weight = Number(request.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      response.status(400).send({ error: 'malformatted parameters' });
    }

    const result: string = calculateBmi(height, weight);
    const responseObj = {
      weight: weight,
      height: height,
      bmi: result
    };
    response.status(200).send(responseObj);

  } catch (error: unknown) {
    let errorMessage = 'malformatted parameters';
    if (error instanceof Error) {
      errorMessage += 'error: ' + error.message;
    }
    response.status(400).send(errorMessage);
    return;
  }
});

app.post('/exercises', (request, response) => {
  const data = request.body as ReturnedArgsTypes;
  const target: number = data.target;
  const daily_exercises: number[] = data.daily_exercises;
  console.log('data', typeof(data));
  console.log('target', typeof(target));
  console.log('daily_exercises', typeof(daily_exercises));
  
  if (!target) {
    return response.status(400).send({ error: 'parameters missing' });
  }

  if (!daily_exercises) {
    return response.status(400).send({ error: 'parameters missing'});
  }

  // Check if target is a valid number
  if (isNaN(target)) {
    return response.status(400).send({ error: 'malformatted parameters' });
  }

  const isNotNaN: boolean = daily_exercises.every((item: number) => !isNaN(item));
  if(!isNotNaN) {
    return response.status(400).send({ error: 'malformatted parameters' });
  }
  
  const result: ResultInterface = exCalculator(target, daily_exercises);

  return response.status(200).send(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});