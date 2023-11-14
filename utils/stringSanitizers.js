/**
 * Checks whetheer a value is a special character i.e non Alpahanumeric
 * @param {*} value 
 * @returns {boolean}
 */
export function isSpecialCharacter(value) {
  // Define a regular expression pattern to match non-alphanumeric characters
  // const pattern = /[^a-zA-Z0-9]/;
  const pattern = /[\s\W_]/;

  // Use the test() method to check if the value contains a special character
  return pattern.test(value);
}

/**
 * Tokenizes content of a book given it's index position
 * @param {String} content 
 * @param {Array} tokenIndexes 
 * @param {Number} index 
 * @returns {Array} Array of valid and invalid tokens
 */
export function contentTokenizer(content, tokenIndexes, index) {
  let [startIndex, endIndex] = tokenIndexes;
  const word = content.substring(startIndex, endIndex);

  const tokens = [];
  const validToken = {
    index: index,
    isTappable: true,
  };
  const invalidToken = {
    index: null,
    token: null,
    isTappable: false,
    content: null,
  };

  validToken['token'] = word.toLowerCase();
  validToken['content'] = word;
  tokens.push(validToken);
  let hasSpecialCharacter;
  // extract the token from the entire content based on provided index position
  const substring = content[endIndex];
  try {
    hasSpecialCharacter = isSpecialCharacter(substring);
  } catch (error) {
    // we can get an out of index error especially for the final tokens in the content
    // in this case, reduce the end index by one value to fix this.
    endIndex--;
    hasSpecialCharacter = isSpecialCharacter(content[endIndex]);
  }
  // if the token is non alpanumeric, we deem it as non-tappable
  if (hasSpecialCharacter) {
    invalidToken.content = content[endIndex];
    // push the invalid token immediately after the valid token to ensure 
    // correct ordering of words.
    tokens.push(invalidToken);
  }
  return tokens;
}

/**
 * Receives a book and runs tokenization function
 * @param {Object} book 
 * @returns {Object} Tokenized book object to feed to the AI model
 */
export function bookTokenizer(book) {
  const new_book = {
    title: book['title'],
    author: book['author'],
    pages: [],
  };

  book.pages.forEach((page) => {
    const new_content = [];
    const content = page['content'];
    const tokens = page['tokens'];

    tokens.forEach((token, index) => {
      const word_tokens = contentTokenizer(content, token['position'], index);
      new_content.push(...word_tokens);
    });

    new_book['pages'].push({
      pageIndex: page['pageIndex'],
      content: new_content,
    });
  });

  return new_book;
}
