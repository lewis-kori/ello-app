import { GET_TOKENIZED_BOOK } from '@/graphql/queries/books';
import resolvers from '@/pages/api/resolvers';
import typeDefs from '@/pages/api/schemas';
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
  expect(response.body.singleResult.data?.book?.title).toBe(
    'A Color of His Own'
  );
});
