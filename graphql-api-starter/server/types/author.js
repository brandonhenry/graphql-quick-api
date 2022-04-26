// author.js
const { gql } = require("graphql-tag");
const { RESTDataSource } = require("apollo-datasource-rest");

// Responsible for fetching data from the REST API
class AuthorAPI extends RESTDataSource {
  constructor() {
    super();
    // rest data source base url
    this.baseURL = "";
  }

  getAuthor(id) {
    return {
      id,
      firstName: "Test",
      lastName: "Test",
      books: []
    };
  }

  getBooks(id) {
    return this.getAuthor(id).books;
  }
}

const Author = gql`
  extend type Query {
    author(id: Int!): Author
  }  
  
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;

const authorAPI = new AuthorAPI();
const authorResolvers = {
  Query: {
    author: () => authorAPI.getAuthor(),
  },
  Author: {
    books: (_, {id}) => authorAPI.getBooks(id),
  },
};

module.exports = { Author, authorResolvers };
