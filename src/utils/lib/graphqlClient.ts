import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  process.env.REACT_APP_GITHUB_URL!,
  {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_KEY}`,
    },
  }
);
