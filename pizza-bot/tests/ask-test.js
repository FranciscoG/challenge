const chai = require('chai');
const expect = chai.expect;
const ask = require('../lib/ask-for-input.js');

describe('cli ask tests', function () {
  let stdin;

  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });
  
  it('question gets a response', function (done) {
    process.nextTick(function mockResponse() {
      stdin.send('response');
    });

    // leaving the question empty so that the test results are cleaner
    ask('')
      .then( (response) => {
        expect(response).to.eq('response');
        done();
      })
      .catch((err)=>{ done(err); });
    
  });

  it('response matches pizzabot expected data', function (done) {
    process.nextTick(function mockResponse() {
      stdin.send('5x5 (1,2) (4,1) (3,3)');
    });

    // leaving the question empty so that the test results are cleaner
    ask('')
      .then( (response) => {
        expect(response).to.eq('5x5 (1,2) (4,1) (3,3)');
        done();
      })
      .catch((err)=>{ done(err); });
    
  });

});