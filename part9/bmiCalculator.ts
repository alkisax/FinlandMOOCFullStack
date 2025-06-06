try {
  const bmiArgs: string[] = process.argv.slice(2)

  if (bmiArgs.length < 2) throw new Error('Not enough arguments');
  if (bmiArgs.length > 2) throw new Error('Too many arguments');

  const height: number = Number(bmiArgs[0])
  const mass: number = Number(bmiArgs[1])

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

  console.log(calculateBmi(height, mass))

} catch (error: unknown){
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error occurred');
  }
}
