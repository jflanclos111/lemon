/**
 * Incements the operand by a specified amount if and only if the resulting value falls within the specified lower and upper bounds. Lower bound must be lower than and cannot be equal to upper bound.
 * @param {number} operand number to be incremented
 * @param {number} increment amount to increment by
 * @param {number} lowerBound lowest allowable return value
 * @param {number} upperBound highest allowable return value
 * @returns {number} incrmeneted value within bounds
 * @example
 * // demonstrates incrementing someValue up and down
 * let someValue = 4;
 * const somePositiveIncrement = 1;
 * const someNegativeIncrement = -4;
 * const someLowerBound = 0;
 * const someUpperBound = 6
 * clamp(someValue, somePositiveIncrment, someLowerBound, someUpperBound); // returns 5
 * clamp(someValue, someNegativeIncrment, someLowerBound, someUpperBound); //returns 1
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
 * // demonstrates setting the precision of someValue
 * let someValue = 3.261867;
 * setPrecision(someValue, 2); // returns 3.26
 */
export function setPrecision(operand: number, decimalPlaces: number = 0): number {
  const adjDecimalPlaces = decimalPlaces >= 0 ? Math.round(decimalPlaces) : 0;
  const excitedValue = operand + Number.EPSILON;
  const multiplier = Math.pow(10, adjDecimalPlaces);
  return Math.round(excitedValue * multiplier) / multiplier;
}

/**
 * Determines if the argument is a valid hex color code.
 * @param {any} item number to be modified
 * @returns {Boolean} true if the item is a valid hex color code, false if it is not
 * @example
 * // demonstrates setting the precision of someValue
 * const someItem = "4F2A35";
 * isValidHexColor(someItem); // true
 */
export function isValidHexColor(item: string): Boolean {
  const hexCharacters = /[0-9A-Fa-f]{6,}/;
  return hexCharacters.test(item) && item.split("").length === 6 ? true : false;
}
