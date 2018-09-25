import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

// Define our schema using the GraphQL schema language
const typeDefs = `
    type User {
        id: String!
        email: String!
        role: String!
    }

    type Query {
        me: User
        test: String!
    }
    
    type Mutation {
        signup (email: String!, password: String!): String
        login (email: String!, password: String!): String
        deleteAccount: String
    }
`;
export default makeExecutableSchema({ typeDefs, resolvers });
