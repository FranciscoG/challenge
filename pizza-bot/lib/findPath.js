"use strict";

/**
 * @typedef {Object} DataObj
 * @property {Array} grid the [x,y] grid system
 * @property {Array} coords  Array of coordinate arrays[[1,2], [3,4], [5,5],...]
 */

/**
 * Find the path from point to point, always travelling X axis first
 *
 * @param {DataObj} data
 * @returns string
 */
function findPath(data) {
  let { grid, coords } = data;
  let [x, y] = grid;

  return coords.reduce((acc, next, i, arr) => {
    if (next[0] >= x || next[0] < 0) {
      throw new Error(`x coordinate from (${next[0]},${next[1]}) is out of grid bounds: ${x}`);
    }
    if (next[1] >= y || next[1] < 0) {
      throw new Error(`y coordinate from (${next[0]},${next[1]}) is out of grid bounds: ${y}`);
    }

    let prev = (i > 0) ? arr[i - 1] : [0,0];

    /*
     * Pizzabot can only move on the X and Y access (diagonal not allowed)
     * directions are calculated very simply: 
     * next X - prev X; next Y - prev Y
     */
    let diffX = next[0] - prev[0];
    let diffY = next[1] - prev[1];

    /*
     * Sometimes the next coordinate is the same exact spot 
     * so we only need to return a D
     */
    if (diffX === 0 && diffY === 0) {
      return acc + "D";
    }

    let currentPath = '';
    
    /**
     * The number's sign (pos,neg) determines which direction it's going
     */
    let xChar = (diffX < 0) ? 'W' : 'E';
    let yChar = (diffY < 0) ? 'S' : 'N';

    currentPath += repeatChar(xChar, Math.abs(diffX) );
    currentPath += repeatChar(yChar, Math.abs(diffY) );
    
    return acc + currentPath + 'D';

  }, "");
}

/**
 * returns a string of the same character repeated n number of times
 *
 * @param {string} char the character to repeat
 * @param {number} n how many times to repeat it
 * @returns string
 */
function repeatChar(char, n) {
  return Array(n)
    .fill(char)
    .join("");
}

module.exports = findPath;
