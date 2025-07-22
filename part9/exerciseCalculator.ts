//npm install --save-dev @types/node

export interface ReturnedArgsTypes {
  target: number,
  daily_exercises: number[]
}

export interface ResultInterface{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const parseArguments = (args: string[]): ReturnedArgsTypes => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  // πρέπει να φιτάξω ένα νεο arr γιατι αλλιώς τα προσθέτει στο ίδιο με αποτέλεσμα αυτό απλώς να μεγαλώνει και το for να καταλήγει σε ένα infinate loop
  const userArgs: number[] = [];
  for (let i=2; i < args.length; i++) {
    userArgs.push(Number(args[i]));
  }
  const isNotNaN = userArgs.every((item: number) => !isNaN(item));

  if (isNotNaN) {
  const target: number = userArgs[0];
  const inputNumbers: number[] = userArgs.slice(1);
    return { target, daily_exercises: inputNumbers };
  } else {
    throw new Error('One or more arguments are not valid numbers');
  }
};

export const exCalculator = (target: number, inputNumbers: number[]): ResultInterface => {
  const trainingDays: number = inputNumbers.filter(day => day > 0).length;
  const sum: number = inputNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const average: number = sum / inputNumbers.length;

  let rating: number;
  if (average >= target) {
    rating = 3;
  } else if (average < target && average >= target * 0.75) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription: string;
  switch (rating) {
    case 3:
      ratingDescription = "Great job! You met your exercise goal";
      break;
    case 2:
      ratingDescription = "Not too bad but could be better";
      break;
    case 1:
      ratingDescription = "You need to exercise more";
      break;
    default:
      ratingDescription = "Rating not found";
  }

  const result = {
    periodLength: inputNumbers.length,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };

  return result;
};

if (require.main === module) {
  try {
    const parsedArgs: ReturnedArgsTypes = parseArguments(process.argv);
    const target: number = parsedArgs.target;
    const inputNumbers: number[] = parsedArgs.daily_exercises;
    const result: ResultInterface = exCalculator(target, inputNumbers);

    console.log(result);
    
  } catch (error: unknown) {
    let errorMessage: string = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }  
}
