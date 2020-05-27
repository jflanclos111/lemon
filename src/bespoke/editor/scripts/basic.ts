/**
 * basic
 * @file Contains basic definitions and functions to be used in the Bleeding Rock engine
 * @author Joseph Lanclos
 * @copyright Joseph Lanclos 2020
 */

/**
 * Identifies present (Current) and past (Last) state in time.
 * @enum {number} Current = 0, Last =1
 * @example
 * //returns the most current value of the class variable being retrieved
 * someClass.getSomeValue(Moment.Current);
 * //returns the most previous value of the class variable being retrieved
 * someClass.getSomeValue(Moment.Last);
 */
export enum Moment {
  Current,
  Last,
}

/**
 * Interface that contains both the present (current) and past (last) state of a boolean.
 * @example
 * //Creates a function taking ChronologicalBoolean as a parameter
 * function someFunction(someParameter: ChronologicalBoolean): void{
 *  //reads the current boolean value from someParameter
 *  const currentValue = someParameter.current;
 *  //reads the last boolean value from someParameter
 *  const lastValue = someParameter.last;
 *  return;
 * }
 */
export interface ChronologicalBoolean {
  current: boolean;
  last: boolean;
}

/**
 * Incements the operand by a specified amount if and only if the resulting value falls within the specified lower and upper bounds. Lower bound must be lower than and cannot be equal to upper bound.
 * @param {number} operand number to be incremented
 * @param {number} increment amount to increment by
 * @param {number} lowerBound lowest allowable return value
 * @param {number} upperBound highest allowable return value
 * @returns {number} incrmeneted value within bounds
 * @example
 * //demonstrates incrementing someValue up and down
 * let someValue = 4;
 * const somePositiveIncrement = 1;
 * const someNegativeIncrement = -4;
 * const someLowerBound = 0;
 * const someUpperBound = 6
 * clamp(someValue, somePositiveIncrment, someLowerBound, someUpperBound); //returns 5
 * clamp(someValue, somePositiveIncrment, someLowerBound, someUpperBound); //returns 6
 * clamp(someValue, somePositiveIncrment, someLowerBound, someUpperBound); //returns 6
 * clamp(someValue, someNegativeIncrment, someLowerBound, someUpperBound); //returns 2
 * clamp(someValue, someNegativeIncrment, someLowerBound, someUpperBound); //returns 2
 */
export function clamp(operand: number, increment: number, lowerBound: number, upperBound: number): number {
  if (lowerBound < upperBound) {
    const newVar = operand + increment;
    return newVar < lowerBound || newVar > upperBound ? operand : newVar;
  }
  return operand;
}

/**
 * Sets the precision of a number such that the decimal places specified are not exceeded. Rounds up or down as necessary to achieve the precision specified.
 * @param {number} operand number to be modified
 * @param {number} [decimalPlaces] number of decimal places allowed
 * @returns {number} number with limited decimal places
 * @example
 * //demonstrates setting the precision of someValue
 * let someValue = 3.261867;
 * //decimal places argument is optional. the default is 0 decimal places.
 * setPrecision(someValue); //returns 3
 * //requesting decimal places higher than what is currently available will not add decimal places
 * setPrecision(someValue, 10); //returns 3.261867
 * //if a float number is used for requesting decimal places, it is rounded and the rounded number is used for requesting decimal places
 * setPrecision(someValue, 2.8); //returns 3.262
 * //if a negative number is used for requesting decimal places, the result will have 0 decimal places
 * setPrecision(someValue, -3.4); //returns 3
 * //normal use
 * setPrecision(someValue, 2); //returns 3.26
 */
export function setPrecision(operand: number, decimalPlaces: number = 0): number {
  const adjDecimalPlaces = decimalPlaces >= 0 ? Math.round(decimalPlaces) : 0;
  const excitedValue = operand + Number.EPSILON;
  const multiplier = Math.pow(10, adjDecimalPlaces);
  return Math.round(excitedValue * multiplier) / multiplier;
}
