//npm install --save-dev @types/node

interface exercise{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

try {
  const args: string[] = process.argv.slice(2)

  if (args.length < 2) throw new Error('Not enough arguments');

  const target: number = Number(args[0]);
  const inputNumbers: number[] = args.slice(1).map(Number);
  if (inputNumbers.some(isNaN)) {
    throw new Error('One or more arguments are not valid numbers');
  }

  const trainingDaysArr: number[] = inputNumbers.filter((el => el !== 0))

  const sum: number = inputNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0)
  const average: number = sum / inputNumbers.length

  let rating: number;
  if (average >= target) {
    rating = 3
  } else if (average < target && average >= target * 0.75) {
    rating = 2
  } else {
    rating = 1
  }

  let ratingDescription: string;
  switch (rating) {
    case 3:
      ratingDescription = "Great job! You met your exercise goal.";
      break;
    case 2:
      ratingDescription = "Not too bad but could be better.";
      break;
    case 1:
      ratingDescription = "You need to exercise more.";
      break;
    default:
      ratingDescription = "Rating not found.";
  }


  const result: exercise = {
    periodLength: inputNumbers.length,
    trainingDays: trainingDaysArr.length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  } 

  console.log(result)

} catch (error: unknown){
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error occurred');
  }
}





