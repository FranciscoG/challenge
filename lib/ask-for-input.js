/**
 * asks user a question and waits for user to input the answer via stdin
 *
 * @param {string} question
 * @returns Promise
 */
function ask(question){
  console.log(question);
  
  return new Promise(function(resolve, reject) {
    
    process.stdin.once('data', function(data){
      resolve(data.toString().trim());
    });
    
    process.stdin.once('error', function(err){
      reject(err);
    });

  });

}

module.exports = ask;