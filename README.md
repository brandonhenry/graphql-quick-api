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

### Fields
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

### Schema
Your schema contains the exact fields and types that can be queried throughout your custom API. Inside of `schema.js`, you can define all the queries that the client can use to retrieve data from your GraphQL server.