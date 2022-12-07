import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const router = express.Router();

var schema = buildSchema(`
  type Query {
    ip: String
  }
`);
const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
  }

router.use(loggingMiddleware)


var root = {
  ip: function (args, request) {
    return request.ip;
  }
};


router.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))
export default router