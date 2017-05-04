module.exports = ((main) => {
  const wordList = main.aiFilterWordbase.wordList;

  /**
   * Async version of checkSync
   * Checks if a string passes the filters
   * @param {String} str String to check
   * @returns {Promise<Boolean>} The result of the check
   */
  function check(str) {
    return new Promise(function(resolve, reject) {
      try {
        setTimeout(resolve(checkSync(str)));
      } catch(err) {
        reject(err);
      }
    });
  }

  /**
   * Checks if a string passes the filters
   * @param {String} str String to check
   * @returns {Boolean} The result of the check
   */
  function checkSync(str) {

    if(!str) return false;

    if(str.match(/:\w{1,}:|^.?[^a-z0-9 ']\w{1,}|(#|@)\w{1,}/ig))
      return false;

    let clean = str.trim().toUpperCase()
      .replace(/\n/g, " ")
      .replace(/CAN(')?T/g, "CANNOT")
      .replace(/'M/g, " AM")
      .replace(/'LL/g, " WILL")
      .replace(/(I|YOU|HE|SHE|IT|THEY|WE)'D/g, (m, p) => p + " WOULD")
      .replace(/'D/, " HAD")
      .replace(/'VE/g, " HAVE")
      .replace(/\BN(')?T/g, " NOT")
      .replace(/[^A-Z ]/g, "")
      .replace(/ARENT/g, "ARE NOT")
      .replace(/WONT/g, "WILL NOT")
      .replace(/THATS/g, "THAT IS")
      .replace(/\b {2,}\b/g, " ");

    let spl = clean.split(' ');

    let vocabulary = [];
    for(word of spl) {
      if(word.length == 0)
        return false;

      if(vocabulary.indexOf(word) == -1)
        vocabulary.push(word);
    }

    let expectedVocabSize = spl.length / 3;
    if(vocabulary.length < expectedVocabSize)
      return false;

    for(word of vocabulary)
      if(word == undefined || wordList.indexOf(word) == -1)
        return false;

    return true;
  }

  return {
    check: check,
    checkSync: checkSync
  };

});
