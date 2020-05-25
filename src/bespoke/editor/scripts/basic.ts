//takes in a variable and returns the variable incremented by the amount "incrment" within the lower bound "lowerBound" and the upper bound "upperBound"
export function clamp(variable: number, increment: number, lowerBound: number, upperBound: number): number {
  const newVar = variable + increment;
  return newVar < lowerBound || newVar > upperBound ? variable : newVar;
}

//takes in a value "value" and returns the value rounded to the amount of decimal places defined by "decimalPlaces"
export function setPrecision(value: number, decimalPlaces: number = 0): number {
  const adjDecimalPlaces = decimalPlaces >= 0 ? Math.round(decimalPlaces) : 0;
  const excitedValue = value + Number.EPSILON;
  const multiplier = Math.pow(10, adjDecimalPlaces);
  return Math.round(excitedValue * multiplier) / multiplier;
}
