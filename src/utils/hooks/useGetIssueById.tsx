import { useQuery } from "react-query";
import { getIssueById } from "../helpers/queries";
import { graphQLClient } from "../lib/graphqlClient";

export const useGetIssueById = (id?: string) => {
  return useQuery("singleIssue", async () => {
    const res = await graphQLClient.request(getIssueById, {
      id: id,
    });
    return res.node;
  });
};
