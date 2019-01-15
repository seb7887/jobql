const express = require('express');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const db = require('./db');

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./resolvers');
const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      "editor.theme": "dark"
    }
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));
schema.applyMiddleware({ app });

const port = process.env.PORT || 8080;

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.status(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.status(200).send({ token });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});