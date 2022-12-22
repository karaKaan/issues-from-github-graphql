import { useInfiniteQuery } from "react-query";
import { getCommentsByIssueId } from "../helpers/queries";
import { graphQLClient } from "../lib/graphqlClient";

export const useGetInfiniteCommentsById = (id?: string) => {
  return useInfiniteQuery(
    "comments",
    async ({ pageParam: endCursor }) => {
      try {
        const res = await graphQLClient.request(getCommentsByIssueId, {
          first: 10,
          after: endCursor,
          id: id,
        });

        return res.node.comments;
      } catch (err) {
        console.log({ err });
      }
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
