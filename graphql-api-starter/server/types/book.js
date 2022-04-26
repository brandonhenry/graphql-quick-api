const { gql } = require("graphql-tag");
const { RESTDataSource } = require("apollo-datasource-rest");

// Responsible for fetching data from the REST API
class BookAPI extends RESTDataSource {
  constructor() {
    super();
    // rest data source base url
    this.baseURL = "";
  }

  getTitle(id) {
    return "Title of book";
  }

  getAuthor(id) {
    return {
      id,
      firstName: "Book Author",
      lastName: "Test",
      books: []
    };
  }
}

// book.js
const Book = gql`
  extend type Query {
    book(id: Int!): Book
  }

  type Book {
    title: String
    author: Author
  }
`;

const bookAPI = new BookAPI();
const bookResolvers = {
  Query: {
    book: (_, { id }) => bookAPI.getTitle(id),
  },
  Book: {
    author: (_, {id }) => bookAPI.getAuthor(id),
  },
};

module.exports = { Book, bookResolvers };
