const readline = require('readline');

/**
 * asks user a questions and waits for use to input the answer
 *
 * @param {string} question
 * @returns Promise
 */
function ask(question){
  console.log(question);
  
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return new Promise(function(resolve, reject) {
    
    rl.once('line', function(line){
      resolve(line);
    });
    
    rl.on('error', function(err){
      reject(err);
    });

  });

}


module.exports = ask;