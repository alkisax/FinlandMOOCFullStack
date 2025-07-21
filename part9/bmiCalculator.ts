interface ArgValues {
  height: number;
  mass: number;
}

try {
  // const bmiArgs: string[] = process.argv.slice(2)
  const parseArguments = (args: string[]): ArgValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        mass: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  const calculateBmi  = (height: number, mass: number): string => {
    const heightInMeters: number = height / 100;
    const bmi: number =  mass / (heightInMeters**2)

    if (bmi < 16.0) {
      return 'Underweight (Severe thinness)';
    } else if (bmi < 17.0) {
      return 'Underweight (Moderate thinness)';
    } else if (bmi < 18.5) {
      return 'Underweight (Mild thinness)';
    } else if (bmi < 25.0) {
      return 'Normal range';
    } else if (bmi < 30.0) {
      return 'Overweight';
    } else if (bmi < 35.0) {
      return 'Obese (Class I)';
    } else if (bmi < 40.0) {
      return 'Obese (Class II)';
    } else {
      return 'Obese (Class III)';
    }
  }

  const data: ArgValues = parseArguments(process.argv)
  const height: number = data.height
  const mass: number = data.mass
  const responce = calculateBmi(height, mass)
  console.log(responce);
  

} catch (error: unknown){
  let errorMessage = 'Something bad happend'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage);
}


