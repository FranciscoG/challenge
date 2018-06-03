/**
 * asks user a questions and waits for use to input the answer
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