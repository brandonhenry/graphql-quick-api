const { merge } = require("lodash"); // use merge from lodash to combine resolvers
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { gql } = require("graphql-tag");

// import all defined types
const { authorResolvers, Author, AuthorAPI } = require("./types/author");
const { bookResolvers, Book, BookAPI } = require("./types/book");

// If you had Query fields not associated with a
// specific type you could put them here
const Query = gql`
  type Query {
    _empty: String
  }
`;

// Every type that the client can request from the server
const typeDefs = [Query, Author, Book];

// The resolvers used to resolve the GraphQL queries for each field on each type
const resolvers = merge({}, authorResolvers, bookResolvers);

// uses graphql-tools to create a new executable schema using the types defined above
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
