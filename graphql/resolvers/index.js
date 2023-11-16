import books from '@/resources/books';
import { bookTokenizer } from '@/utils/stringSanitizers';

const resolvers = {
  Query: {
    book(parent, args, contextValue, info) {
      const book = books.find(
        (book) =>
          book.title.toLowerCase().trim() === args.title.toLowerCase().trim()
      );
      const tokenizedBook = bookTokenizer(book);
      return tokenizedBook;
    },
  },
};

export default resolvers;
