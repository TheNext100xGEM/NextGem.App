const formatter = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
/**
 * Compares three values and returns the maximum.
 * The values can be either BigInt or Number.
 * @param {BigInt|Number} a - The first value.
 * @param {BigInt|Number} b - The second value.
 * @param {BigInt|Number} c - The third value.
 * @returns {BigInt} - The maximum value.
 */
function maxOfThree(a:BigInt, b: BigInt, c: BigInt) {
    // Convert all values to BigInt
    const aBigInt = a;
    const bBigInt = b;
    const cBigInt = c;
  
    // Find the maximum value
    let max = aBigInt;
    if (bBigInt > max) {
      max = bBigInt;
    }
    if (cBigInt > max) {
      max = cBigInt;
    }
    
    return max;
  }
export { formatter, maxOfThree }

