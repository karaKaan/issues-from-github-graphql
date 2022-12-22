import { useCallback, useState } from "react";
import { SearchField } from "../../components/SearchField";
import debounce from "lodash.debounce";
import { Container } from "../../components/Container";
import moment from "moment";
import { Card } from "../../components/Card";
import { Dropdown } from "../../components/Dropdown";
import { LoadingSpinner, LoadingText } from "../../components/Loading";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addDropdownSelectedValue } from "../../components/Dropdown/dropdownSlice";
import { useGetInfiniteIssues } from "../../utils/hooks/useGetInfiniteIssues";
function Home() {
  const value = useAppSelector((state) => state.dropdownSelectedValue);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownValue, setDropdownValue] = useState(() => {
    if (value) {
      return value;
    }
    return "";
  });
  const dispatch = useAppDispatch();

  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetInfiniteIssues(searchTerm, dropdownValue);

  const handleOnChange = (search: string) => {
    setUserInput(search);
    setSearchTerm(search);
    callDebounce();
  };
  const callDebounce = useCallback(
    debounce(() => {
      refetch();
    }, 500),
    []
  );

  const callDebounceOnDropdown = useCallback(
    debounce(() => {
      refetch();
    }),
    []
  );

  const handleDropdownChange = (value: string) => {
    dispatch(addDropdownSelectedValue(value));
    setDropdownValue(value);
    callDebounceOnDropdown();
  };

  return (
    <Container>
      <div className={styles.headerWrapper}>
        <SearchField
          text={userInput}
          onChange={(e) => handleOnChange(e.target.value)}
        />

        <Dropdown
          onChange={(e) => handleDropdownChange(e.target.value)}
          selectedValue={dropdownValue}
          dropdownItems={[
            { label: "Open & Closed", value: "open,closed" },
            { label: "Open", value: "open" },
            { label: "Closed", value: "closed" },
          ]}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <h1>{`Error: ${error}`}</h1>
      ) : (
        <>
          {data?.pages.map((page, index: number) =>
            page.nodes.map(
              (
                item: {
                  title: string;
                  id: string;
                  bodyText: string;
                  state: "OPEN" | "CLOSED";
                  createdAt: string;
                  author: {
                    avatarUrl: string;
                    login: string;
                  };
                },
                index: number
              ) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  state={item.state}
                  author={item.author.login}
                  img={{
                    src: item.author.avatarUrl,
                    alt: item.author.login,
                  }}
                  date={moment(item.createdAt)
                    .locale("de")
                    .format("MMM. DD YYYY")}
                />
              )
            )
          )}
          {hasNextPage && <LoadingText fetchMore={fetchNextPage} />}
        </>
      )}
    </Container>
  );
}

export default Home;
