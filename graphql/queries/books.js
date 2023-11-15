export const GET_TOKENIZED_BOOK = `
  query 
    book($title: String) { book(title: $title) {
      title,
      author,
      pages {
          pageIndex,
          content {
              index,
              token,
              content,
              isTappable
          }
      }
  }
}
`;
