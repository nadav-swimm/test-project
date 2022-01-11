// this is a custom Jest transformation file 
// to assist importing svg icon files within testing
module.exports = {
    process(fileContent) {
      return "module.exports = " + JSON.stringify(fileContent) + ";";
    }
    
  };