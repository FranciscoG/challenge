const chai = require('chai');
const expect = chai.expect;
const parseInput = require( '../lib/parseInput.js' );
const findPath = require( '../lib/findPath.js' );

describe('pizzabot findPath tests', function() {

  it('should throw out of bonds error of coordinates lead outside of grid', function(){
    let data;

    data  = parseInput("60x60 (60, 3) (4, 4)");
    expect( findPath.bind(findPath, data) ).to.throw(Error);
    
    data  = parseInput("60x60 (33, 28) (70, 4)");expect( findPath.bind(findPath, data) ).to.throw(Error);
    expect( findPath.bind(findPath, data) ).to.throw(Error);
  });

  it('should find the correct path', function() {
    let data  = parseInput("5x5 (1, 3) (4, 4)");
    let path = findPath(data);
    expect(path).to.eq('ENNNDEEEND');
  });

  it('should get the right path for the challenge', function(){
    let data = parseInput("5x5 (0, 0) (1, 3) (4, 4) (4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4, 1)");
    let path = findPath(data);
    expect(path).to.eq('DENNNDEEENDSSDDWWWWSDEEENDWNDEESSD');
  });

});