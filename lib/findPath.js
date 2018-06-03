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

  return coords.reduce((acc, val, i, arr) => {
    if (val[0] >= x) {
      // throw new Error()
    }
    if (val[1] >= y) {}

    let last = (i > 0) ? arr[i - 1] : [0,0];

    let diffX = val[0] - last[0];
    let diffY = val[1] - last[1];

    // sometimes the coordinate could be in the same place
    if (diffX === 0 && diffY === 0) {
      return acc + "D";
    }

    let currentPath = '';
    let xChar = (diffX < 0) ? 'W' : 'E';
    let yChar = (diffY < 0) ? 'S' : 'N';
    currentPath += repeatChar(xChar, Math.abs(diffX) );
    currentPath += repeatChar(yChar, Math.abs(diffY) );
    return acc + currentPath + 'D';

  }, "");
}

/**
 * returns a string of same character repeated n number of times
 *
 * @param {any} char
 * @param {any} n
 * @returns string
 */
function repeatChar(char, n) {
  return Array(n)
    .fill(char)
    .join("");
}

module.exports = findPath;
