"use strict";

/**
 * @typedef {Object} Output
 * @property {Array} grid the [x,y] grid system
 * @property {Array} coords  Array of coordinate arrays[[1,2], [3,4], [5,5],...]
 */

/**
 * Parses string input and converts it into pure data for the path finder
 *
 * @param {string} input
 * @returns Output
 */
function parseInput(input) {
  if (typeof input !== "string") {
    throw new TypeError("input argument should be a string");
  }

  /*
   * First we remove all whitespace because we don't need it
   * and it will make it easier to test proper formatting later
   */
  input = input.replace(/\s/g, "");

  /**
   * input can only contain a very limited set of case sensitve characters:
   * ( , ) 0-9 x 
   */
  const whiteListRegex = new RegExp("[(,)0-9x]", "g");
  let charTest = input.replace(whiteListRegex, "");
  if (charTest.length > 0) {
    throw new Error("input contains invalid characters: " + charTest);
  }

  /**
   * validate that the input is formatted correctly:
   * 5x5(0,1)(2,4)... 
   */
  const formatTextRegex = new RegExp("\\d+x\\d+(\\(\\d+,\\d+\\))+");
  if (!formatTextRegex.test(input)) {
    throw new Error ("input is not properly formatted");
  }

  /*
   * extract the grid portion of the input
   */
  const gridRegex = new RegExp('^\\d+x\\d+');
  
  let grid = input
    .match(gridRegex)[0]
    .split("x")
    .map(Number);

  input = input.replace(gridRegex, '');

  /*
   * parse the coordinates portion into an array of coordinate arrays
   * (0,1)(3,4) --> [ [0,1] , [3,4] ]
   */
  let coords = input
    .replace(/[()]/g,' ')
    .trim()
    .split('  ')
    .map(e => e.split(',').map(Number) );
  
  
  return {
    grid,
    coords
  };
}

module.exports = parseInput;
