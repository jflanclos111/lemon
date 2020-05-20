export class Basic {
  //takes in a variable and returns the variable incremented by the amount "incrment" within the lower bound "lowerBound" and the upper bound "upperBound"
  static boundaryIncrement(variable, increment, lowerBound, upperBound) {
    const newVar = variable + increment;
    return newVar < lowerBound || newVar > upperBound ? variable : newVar;
  }
}
