import { useInfiniteQuery } from "react-query";
import { getIssuesBySearch } from "../helpers/queries";
import { graphQLClient } from "../lib/graphqlClient";

export const useGetInfiniteIssues = (
  searchTerm?: string,
  dropdownValue?: string
) => {
  return useInfiniteQuery(
    "issues",
    async ({ pageParam: endCursor }) => {
      const res = await graphQLClient.request(getIssuesBySearch, {
        first: 10,
        after: endCursor,
        search: `repo:facebook/react is:issue ${searchTerm} in:title,body ${
          dropdownValue === "open" || dropdownValue === "closed"
            ? `is:${dropdownValue}`
            : ""
        }`,
      });

      return res.search;
    },
    {
      getNextPageParam: (nextItems) => {
        if (nextItems.pageInfo.hasNextPage) {
          return nextItems.pageInfo.endCursor;
        }
        return undefined;
      },
    }
  );
};
