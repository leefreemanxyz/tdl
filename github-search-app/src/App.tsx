import {
  AppBar,
  Container,
  LinearProgress,
  TextField,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import UserCard from "./components/UserCard";
import useDebounce from "./hooks/useDebounce";
import { useLocationContext } from "./providers/LocationContext";

const searchGithub = ({ queryKey }: { queryKey: any }) => {
  const [_, { q, page, per_page = 10 }] = queryKey;
  return axios.get(
    `http://localhost:3001/search/users?q=${q} type:user&page=${page}&per_page=${per_page}`
  );
};

function App() {
  const { params, urlDispatch } = useLocationContext();
  const [page, setPage] = useState(1);
  const searchTerm = params.get("q") || "";
  const debouncedQ = useDebounce(searchTerm, 400);

  const { data, isLoading, isError } = useQuery(
    ["search", { q: debouncedQ, page }],
    searchGithub,
    {
      staleTime: 60 * 60 * 1000,
      enabled: debouncedQ.length > 0,
    }
  );

  const handleSetQuery = (e: any) => {
    urlDispatch({ type: "set", payload: { key: "q", value: e.target.value } });
  };

  const handleChangePage = (e: any, value: any) => {
    setPage(value);
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
            <TextField
              data-testid="search-input"
              placeholder="Search"
              onChange={handleSetQuery}
              value={searchTerm}
              fullWidth
            />
          </Container>
        </Toolbar>
        {isLoading && <LinearProgress color="secondary" />}
      </AppBar>
      <Container>
        {isError && <Alert severity="error">Something went wrong!</Alert>}
        {totalCount && (
          <Typography variant="h5">
            Total count: <span data-testid="total-count">{totalCount}</span>
          </Typography>
        )}
        {showPagination && (
          <Typography>
            Page: <span data-testid="current-page">{page}</span> /{" "}
            <span data-testid="total-pages">{numberOfPages}</span>
          </Typography>
        )}
        {data?.data?.items.map((item: any) => {
          return <UserCard key={item.login} username={item.login} />;
        })}
      </Container>
      <Container>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            {showPagination && (
              <Pagination
                count={numberOfPages}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
