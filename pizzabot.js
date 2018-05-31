#!/usr/bin/env node
'use strict';
const parseInput = require('./lib/parseInput.js');
const findPath = require('./lib/findPath.js');

// read input args
let input = process.argv[2];

/**
 * Show some instructions if the user did not include the proper argument 
 */
if (!input) {
  let instructions = `
    Example Usage: 
      ./pizzabot.js "5x5 (1,3) (5,5) (3,2)"

    Pizzabot only accepts one argument in the form of a string surrounded
    by quotation marks. The argument will consist of a grid declaration followed
    by coordinates within parenthesis. See example usage above.
`;
  console.log(instructions);
  process.exit(0);
}

// parse args
let parsed = parseInput(input);

if (!parsed) { process.exit(1); }

// pass them to lib, get output
let { grid, coords } = parsed;
let path = findPath(grid, coords);

console.log(path);
