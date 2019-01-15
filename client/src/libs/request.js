const endpointURL = 'http://localhost:8080/graphql';

const graphqlRequest = async (query, variables = {}) => {
  const res = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables
    })
  });
  const response = await res.json();
  if (response.errors) {
    const message = response.errors.map(error => error.message).join('\n');
    throw new Error(message);
  }
  return response.data;
}

export const loadJob = async (id) => {
  const query = `query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }`;
  const { job } = await graphqlRequest(query, { id })
  return job;
}

export const loadJobs = async () => {
  const query = `{
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}

export const loadCompany = async (id) => {
  const query = `query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const { company } = await graphqlRequest(query, { id })
  return company;
}

export const createJob = async (input) => {
  const mutation = `mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { job } = await graphqlRequest(mutation, { input });
  return job;
}