require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const fs = require('fs');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./resolvers');
const db = require('./db');

const port = process.env.PORT || 8080;

const opts = {
  port: port,
  endpoint: '/graphql'
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db })
});

server.express.use(bodyParser.json());
server.express.use(cors());
server.express.use(morgan('combined'));
server.express.use(helmet());
server.use(expressJwt({
  secret: process.env.APP_SECRET,
  credentialsRequired: false
}));

// Decode JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const { sub } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = sub;
  }
  next();
});

const userQuery = `{
  id
  company {
    id
    name
  }
}`;

server.express.use(async (req, res, next) => {
  // if not logged in, skip this
  if (req.userId) {
    const user = await db.query.user(
      { where: { id: req.userId } },
      userQuery
    );
    req.me = user;
  }
  next();
});

server.start(opts, () => console.log(`Server is running on port ${opts.port}`));