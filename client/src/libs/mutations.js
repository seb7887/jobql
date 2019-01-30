import gql from 'graphql-tag';
import { jobDetailFragment } from './fragments';

export const jobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const loginMutation = gql`
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