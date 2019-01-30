import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import { isLoggedIn, getAccessToken } from '../libs/auth';

const endpointURL = 'http://localhost:8080/graphql';
const accessTokenKey = 'accessToken';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    const token = getAccessToken();
    operation.setContext({
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
  }
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({ uri: endpointURL })
  ]),
  cache: new InMemoryCache()
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

const jobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const jobsQuery = gql`
  query JobsQuery {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

const companyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

const jobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const loginMutation = gql`
  mutation SignIn($input: SigninInput) {
    me: signin(input: $input) {
      user {
        id
        email
      }
      token
    }
  }
`;

export const loadJob = async (id) => {
  const { data: { job } } = await client.query({ query: jobQuery, variables: { id } });
  return job;
}

export const loadJobs = async () => {
  const { data: { jobs } } = await client.query({ query: jobsQuery, fetchPolicy: 'no-cache' });
  return jobs;
}

export const loadCompany = async (id) => {
  const { data: { company } } = await client.query({ query: companyQuery, variables: { id } });
  return company;
}

export const createJob = async (input) => {
  const { data: { job } } = await client.mutate({
    mutation: jobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data
      });
    }
  });
  return job;
}

export const login = async (input) => {
  const { data: { me: { token } } } = await client.mutate({
    mutation: loginMutation,
    variables: { input }
  });
  if (token) {
    localStorage.setItem(accessTokenKey, token);
  }
  return token;
}