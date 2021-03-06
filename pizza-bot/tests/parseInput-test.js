const chai = require('chai');
const expect = chai.expect;
const parseInput = require( '../lib/parseInput.js' );

describe('pizzabot input tests', function() {

  it('should throw a TypeError if argument is not a string', function() {
    let badFn = ()=>{ parseInput(55); }
    expect( badFn ).to.throw(TypeError);

    badFn = ()=>{ parseInput([]); }
    expect( badFn ).to.throw(TypeError);

    badFn = ()=>{ parseInput({}); }
    expect( badFn ).to.throw(TypeError);

    badFn = ()=>{ parseInput(true); }
    expect( badFn ).to.throw(TypeError);

    badFn = ()=>{ parseInput(null); }
    expect( badFn ).to.throw(TypeError);

    badFn = ()=>{ parseInput(undefined); }
    expect( badFn ).to.throw(TypeError);

    badFn = ()=>{ parseInput(""); }
    expect( badFn ).to.not.throw(TypeError);
  });

  it('it should throw an error if input contains invalid characters', function(){
    let badFn = ()=>{ parseInput("5x5 & (0,1)"); }
    expect( badFn ).to.throw(Error);

    badFn = ()=>{ parseInput("pizza 5x5 (0,1) "); }
    expect( badFn ).to.throw(Error);

    badFn = ()=>{ parseInput("#$^W%^%^UEYJET "); }
    expect( badFn ).to.throw(Error);

    badFn = ()=>{ parseInput(" 60x60 (0,p) (5,%) "); }
    expect( badFn ).to.throw(Error);

    badFn = ()=>{ parseInput(" 5X5 (0,1) "); }
    expect( badFn ).to.throw(Error);

  });

  it('should throw an error if input passes tests above but it still not properly formatted', function(){
    let badFn = ()=>{ parseInput("5x5  (0,) (,5)"); }
    expect( badFn ).to.throw('input is not properly formatted');

    badFn = ()=>{ parseInput("   5x5 0,1 (5,4) "); }
    expect( badFn ).to.throw('input is not properly formatted');

    badFn = ()=>{ parseInput("6 10 (0,1) (5,4)"); }
    expect( badFn ).to.throw('input is not properly formatted');

  });

  it('should not throw if input contains only valid characters', function(){
    let goodFn = ()=>{ parseInput("5x5 (0, 0) (1, 3) (4,4)(4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4,1) "); }
    expect( goodFn ).to.not.throw();
  })

  it('should return an object with 2 properties: grid & coords', function(){
    let result = parseInput("5x5 (0, 0) (1, 3) (4,4)(4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4,1) ");
    expect( result ).to.have.property('grid');
    expect( result ).to.have.property('coords');
  })

  it('rertuned.grid should be an array with length of 2 and only numbers', function(){
    let result = parseInput("5x5 (0, 0) (1, 3) (4,4)(4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4,1) ");
    expect(result.grid).to.be.an('array');
    // need to check length first because Array.every returns true on empty arrays
    expect(result.grid.length).to.eq(2);
    expect(result.grid).to.satisfy(function(nums) { 
      return nums.every( n => typeof n === 'number' ); 
    });

    let result2 = parseInput("400x400 (233, 311) (50, 30) (300,4) (160, 2)(399,399)");
    expect(result2.grid).to.be.an('array');
    // need to check length first because Array.every returns true on empty arrays
    expect(result2.grid.length).to.eq(2);
    expect(result2.grid).to.satisfy(function(nums) { 
      return nums.every( n => typeof n === 'number' ); 
    });
  }); 

  it('rertuned.coords should be an array of coordinate arrays', function(){
    let result = parseInput("5x5 (0, 0) (1, 3) (4,4)");
    expect(result.coords).to.be.an('array');
    // need to check length first because Array.every returns true on empty arrays
    expect(result.coords.length).to.be.greaterThan(0);
    expect(result.coords).to.satisfy(function(coords) { 
      return coords.every( arr => Array.isArray(arr) ); 
    });

    let result2 = parseInput("9000x9000 (5637, 1023) (8888, 44)");
    expect(result2.coords).to.be.an('array');
    // need to check length first because Array.every returns true on empty arrays
    expect(result2.coords.length).to.be.greaterThan(0);
    expect(result2.coords).to.satisfy(function(coords) { 
      return coords.every( arr => Array.isArray(arr) ); 
    });
  });

  it('each coordinate array should be of length 2 and only contain numbers', function(){
    let result = parseInput("5x5 (0, 0) (1, 3) (4,4)");
    expect(result.coords.length).to.eq(3);
    expect(result.coords).to.satisfy(function(coords) { 
      return coords.every( arr => arr.length === 2 && arr.every( n => typeof n === 'number' ) ); 
    });
  });

});