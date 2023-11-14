import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
const fs = require('fs');
const path = require('path');

import { bookTokenizer } from '@utils/stringSanitizers';
const booksDirectoryPath = './resources';

const books = [];

fs.readdir(booksDirectoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(booksDirectoryPath, file);
    if (path.extname(file) === '.json') {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        books.push(jsonData);
      } catch (error) {
        console.error('Error reading JSON file:', filePath, error);
      }
    }
  });

});

const typeDefs = gql`
  type Query {
    book(title: String): Book
  }

  type Book {
    title: String
    author: String
    pages: [Page!]
  }

  type Page {
    pageIndex: Int
    content: [Content!]
  }

  type Content {
    index: Int
    token: String
    content: String
    isTappable: Boolean
  }
`;

const resolvers = {
  Query: {
    book(parent, args, contextValue, info) {
      const book = books.find(
        (book) =>
          book.title.toLowerCase().trim() === args.title.toLowerCase().trim()
      );
      let tokenizedBook = bookTokenizer(book)
      return tokenizedBook
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer);
