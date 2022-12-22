import { gql } from "graphql-request";

export const getIssuesBySearch = gql`
  query getIssuesBySearch($first: Int, $after: String, $search: String!) {
    search(query: $search, type: ISSUE, first: $first, after: $after) {
      issueCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Issue {
          id
          author {
            avatarUrl
            login
          }
          state
          createdAt
          title
          bodyHTML
        }
      }
    }
  }
`;

export const getIssueById = gql`
  query getIssues($id: ID!) {
    node(id: $id) {
      ... on Issue {
        title
        body
        bodyHTML
        createdAt
        author {
          avatarUrl
          url
        }
      }
    }
  }
`;

export const getCommentsByIssueId = gql`
  query getIssues($first: Int, $after: String, $id: ID!) {
    node(id: $id) {
      ... on Issue {
        comments(first: $first, after: $after) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            bodyHTML
            createdAt
            author {
              avatarUrl
              login
            }
          }
        }
      }
    }
  }
`;
