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
  const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    // πρέπει να φιτάξω ένα νεο arr γιατι αλλιώς τα προσθέτει στο ίδιο με αποτέλεσμα αυτό απλώς να μεγαλώνει και το for να καταλήγει σε ένα infinate loop
    const userArgs: number[] = [];
    for (let i=2; i < args.length; i++) {
      userArgs.push(Number(args[i]))
    }
    const isNotNaN = userArgs.every((item: number) => !isNaN(item))

    if (isNotNaN) {
      return userArgs
    } else {
      throw new Error('One or more arguments are not valid numbers');
    }
  }

  const parsedArgs: number[] = parseArguments(process.argv)

  const target: number = parsedArgs[0]
  const inputNumbers: number[] = parsedArgs.slice(1)

  const trainingDays: number = inputNumbers.filter(day => day > 0).length

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


  const result: exercise = {
    periodLength: inputNumbers.length,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  } 

  console.log(result)

} catch (error: unknown) {
  let errorMessage = 'Something bad happend'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage);
}





