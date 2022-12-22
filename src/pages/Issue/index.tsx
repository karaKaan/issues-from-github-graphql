import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { LoadingSpinner, LoadingText } from "../../components/Loading";
import { IoPersonCircle, IoChevronBack } from "react-icons/io5";
import styles from "./styles.module.css";
import { Container } from "../../components/Container";
import { useGetIssueById } from "../../utils/hooks/useGetIssueById";
import { useGetInfiniteCommentsById } from "../../utils/hooks/useGetInfiniteComments";

const Issue = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = useGetIssueById(id);
  const {
    isError,
    data: comments,
    error: err,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteCommentsById(id);
  if (issue.isFetching) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.headerWrapper}>
        <div
          className={styles.revert}
          onClick={() => {
            navigate("/");
          }}
        >
          <IoChevronBack />
          <p>Go Back</p>
        </div>

        <>
          <h1>{issue.data.title}</h1>
          <div
            className={styles.contentWrapper}
            dangerouslySetInnerHTML={{ __html: issue.data.bodyHTML }}
          />
        </>
      </div>
      <div className={styles.commentsWrapper}>
        <h3>Comments:</h3>
        {isError ? (
          <h1>{`Error: ${err}`}</h1>
        ) : (
          comments?.pages.map((page, index) => (
            <div key={`${page}-${index}`} className={styles.comments}>
              {page.nodes.map(
                (
                  comment: {
                    id: string;
                    bodyHTML: string;
                    author?: { avatarUrl: string; login: string };
                  },
                  index: number
                ) => (
                  <div
                    key={`${id}-${index}`}
                    className={styles.commentsContent}
                  >
                    <div className={styles.authorWrapper}>
                      {comment.author ? (
                        <>
                          <img
                            src={comment.author.avatarUrl}
                            alt=""
                            width={60}
                            height={60}
                          />
                          <h4>{comment.author.login}</h4>
                        </>
                      ) : (
                        <>
                          <IoPersonCircle size={60} />
                          <h4>unknown</h4>
                        </>
                      )}
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}
                    />
                  </div>
                )
              )}
            </div>
          ))
        )}
        {hasNextPage && <LoadingText fetchMore={fetchNextPage} />}
      </div>
    </Container>
  );
};

export default Issue;
