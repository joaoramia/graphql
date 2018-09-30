// Define our schema using the GraphQL schema language
const authTypeDefs = `
    type User {
        id: String!
        email: String!
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
export default authTypeDefs;
