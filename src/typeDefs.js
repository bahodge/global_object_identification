const { gql } = require("apollo-server");

module.exports = gql`
  type User implements Node {
    id: ID!
    name: String!
    robots(
      first: Int
      after: String
      last: Int
      before: String
      limit: Int
    ): UserRobotsConnection
  }

  type PageInfo {
    startCursor: String!
    endCursor: String!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type UserRobotsConnection {
    pageInfo: PageInfo!
    edges: [UserRobotsEdge!]!
  }

  type UserRobotsEdge {
    cursor: String
    node: Robot!
  }

  type Robot implements Node {
    id: ID!
    name: String!
    maintainers: [User!]!
  }

  interface Node {
    id: ID!
  }

  type Query {
    users: [User!]!
    robots: [Robot!]!
    node(id: ID!): Node
    nodes(ids: [ID!]!): [Node!]!
  }
`;
