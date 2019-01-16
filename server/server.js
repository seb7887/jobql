const { GraphQLServer } = require('graphql-yoga');
const fs = require('fs');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./resolvers');

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const port = process.env.PORT || 8080;

const opts = {
  port: port,
  endpoint: '/graphql'
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.express.use(bodyParser.json());
server.express.use(cors());
server.express.use(morgan('combined'));
server.express.use(helmet());
server.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

server.start(opts, () => console.log(`Server is running on port ${opts.port}`));