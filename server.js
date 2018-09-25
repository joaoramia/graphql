import dotenv from 'dotenv';
import jwt from 'express-jwt';
import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './data/schema';

const PORT = process.env.port || 3000;
const app = express();
dotenv.load();

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
});

mongoose.connect('mongodb://localhost/jwtauth');

app.use(
  '/graphql',
  bodyParser.json(),
  auth,
  graphqlHTTP(req => ({
    schema,
    context: {
      user: req.user,
    },
    graphiql: process.env.NODE_ENV === 'development',
  }))
);

app.listen(PORT, function() {
  console.log('Server is running on Port', PORT);
});
