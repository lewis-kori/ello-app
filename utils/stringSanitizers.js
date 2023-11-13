export function isSpecialCharacter(value) {
  // Define a regular expression pattern to match non-alphanumeric characters
  // const pattern = /[^a-zA-Z0-9]/;
  const pattern = /[\s\W_]/;

  // Use the test() method to check if the value contains a special character
  return pattern.test(value);
}

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
  const substring = content[endIndex];
  try {
    hasSpecialCharacter = isSpecialCharacter(substring);
  } catch (error) {
    endIndex--;
    hasSpecialCharacter = isSpecialCharacter(content[endIndex]);
  }
  if (hasSpecialCharacter) {
    invalidToken.content = content[endIndex];
    tokens.push(invalidToken);
  }
  return tokens;
}

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
