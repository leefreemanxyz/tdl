import {
  AppBar,
  Container,
  LinearProgress,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { SyntheticEvent } from "react";
import { useQuery } from "react-query";
import UserCard from "./components/UserCard";
import Pagination from "./components/Pagination";
import { API_URL } from "./const";
import useDebounce from "./hooks/useDebounce";
import { useLocationContext } from "./providers/LocationContext";
import MetaInfo from "./components/MetaInfo";
import TextField from "./components/TextField";

const searchGithub = ({ queryKey }: { queryKey: any }) => {
  const [, { q, page, per_page = 10 }] = queryKey;
  return axios.get(
    `${API_URL}/search/users?q=${q} type:user&page=${page}&per_page=${per_page}`
  );
};

function App() {
  const { params, urlDispatch } = useLocationContext();
  const searchTerm = params.get("q") || "";
  const page = params.get("page") || 1;
  const debouncedQ = useDebounce(searchTerm, 400);

  const { data, isLoading, isError } = useQuery(
    ["search", { q: debouncedQ, page }],
    searchGithub,
    {
      staleTime: 60 * 60 * 1000,
      enabled: debouncedQ.length > 0,
    }
  );

  const handleSetQuery = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    urlDispatch({
      type: "set",
      payload: { key: "q", value: e.currentTarget.value },
    });
  };

  const handleChangePage = (
    _: SyntheticEvent<HTMLButtonElement>,
    value: number
  ) => {
    urlDispatch({
      type: "set",
      payload: { key: "page", value: String(value) },
    });
  };

  const numberOfPages =
    Math.min(Math.ceil(data?.data?.total_count / 10), 100) ?? 0;
  const showPagination = numberOfPages > 1;

  const totalCount = data?.data?.total_count ?? false;

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Container>
            <Grid>
              <TextField onChange={handleSetQuery} searchTerm={searchTerm} />
            </Grid>
          </Container>
        </Toolbar>
        {isLoading && <LinearProgress color="secondary" />}
      </AppBar>
      <Container>
        {isError && <Alert severity="error">Something went wrong!</Alert>}
        <MetaInfo
          totalCount={totalCount}
          showPagination={showPagination}
          page={Number(page)}
          numberOfPages={numberOfPages}
        />
        {data?.data?.items.map((item: any) => {
          return <UserCard key={item.login} username={item.login} />;
        })}
      </Container>
      {showPagination && (
        <Pagination
          numberOfPages={numberOfPages}
          page={Number(page)}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
}

export default App;
