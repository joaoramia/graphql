import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import authTypeDefs from './auth/auth.schema';

// Define our schema using the GraphQL schema language
const typeDefs = authTypeDefs;
export default makeExecutableSchema({ typeDefs, resolvers });
