import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    book(title: String): Book
  }

  type Book {
    title: String
    author: String
    pages: [Page!]!
  }

  type Page {
    pageIndex: Int
    content: [Content!]!
  }

  type Content {
    index: Int
    token: String
    content: String
    isTappable: Boolean
  }
`;

export default typeDefs;
