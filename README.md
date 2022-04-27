# graphql-quick-api
This project is a template for introduction and quick spin up of GraphQL API endpoints using Apollo Server.

## Get Started
If you are just learning about GraphQL, start with the `graphql-api-example` first. If you are looking to start building out your own GraphQL API, use the `graphql-api-starter` to begin creating your schema and queries.

Based on [Apollo GraphQL Example - Building a GraphQL API](https://www.apollographql.com/blog/graphql/examples/building-a-graphql-api/)

## GraphQL API Example
This folder contains the complete example from the beforementioned tutorial. 

To begin:

1. Open a terminal in the `graphql-quick-api` root folder.
2. Navigate into the api example folder via `cd graphql-api-example`
3. Start the server via `node index.js`
4. Navigate to `http://localhost:4000` and interact with the server using Apollo Studio
5. Review comments to reference how the server is configured in its simplest form

## GraphQL API Starter
Creating a new GraphQL server is as simple as copying the `graphql-api-starter` folder and adding in the type of data you want a user to be able to pull from your endpoint. 

### Types
Each type should go into it's own javascript file. 

**Ex.** `author.js`

#### Fields
Inside of each type `.js` file, you will want to return a string that contains SDL in order for it to be parsed correctly when importing back into your schema. 

``` js
// author.js
export const typeDef = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;
```

#### API Stitching
These files also contain a class that extends the `DataSource` object that comes from `ApolloServer`. When defining a Type, you can also setup what endpoints that Type needs to hit in order to resolve all of its fields. This class is instantiated and used inside of the resolvers that we export.

#### Resolvers
Inside of each type `.js` file, you will also find resolvers that are responsible for returning the data defined by the SDL in the exported `typeDef` variable.

```js
const authorAPI = new AuthorAPI();
const authorResolvers = {
  Query: {
    author: () => authorAPI.getAuthor(),
  },
  Author: {
    books: (_, {id}) => authorAPI.getBooks(id),
  },
};
```


### Schema
Your schema contains the exact fields and types that can be queried throughout your custom API. Inside of `schema.js`, you can define all the queries that the client can use to retrieve data from your GraphQL server.
Using our modularized set up of Types, we can simple import these Types and resolvers and utilize them straight in our schema.

``` js

// import all defined types
const { authorResolvers, Author } = require("./types/author");
const { bookResolvers, Book } = require("./types/book");

// Every type that the client can request from the server
const typeDefs = [Query, Author, Book];

// The resolvers used to resolve the GraphQL queries for each field on each type
const resolvers = merge({}, authorResolvers, bookResolvers);

// uses graphql-tools to create a new executable schema using the types defined above
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
```

#### Data Graph
There are many times where it can be hard to visualize your data and the graph it makes. That is why it is recommended to create a data graph that explores what your fields and types will look like.

Here is an example data graph for the starter project
![Schema Graph](/graphql-api-starter/server/schema-graph.png "Schema Graph")

