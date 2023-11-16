import { GET_TOKENIZED_BOOK } from '@/graphql/queries/books';
import resolvers from '@/graphql/resolvers';
import typeDefs from '@/graphql/schemas';
import { ApolloServer } from '@apollo/server';

it('should get a book object', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation({
    query: GET_TOKENIZED_BOOK,
    variables: { title: 'a color of His Own' },
  });
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toHaveProperty('book');
  expect(Array.isArray(response.body.singleResult.data.book.pages)).toBe(true);
  expect(response.body.singleResult.data?.book?.title).toBe(
    'A Color of His Own'
  );
});
