import {
  AppBar,
  Container,
  LinearProgress,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import axios from "axios";
import { useQuery } from "react-query";
import UserCard from "./components/UserCard";
import useDebounce from "./hooks/useDebounce";
import { useWindowLocation } from "./providers/WindowProvider";

const searchGithub = ({ queryKey }: { queryKey: any }) => {
  const [_, { q, page = 0, per_page = 10 }] = queryKey;
  return axios.get(
    `http://localhost:3001/search/users?q=${q} type:user&page=${page}&per_page=${per_page}`
  );
};

function App() {
  const { params, urlDispatch } = useWindowLocation();
  const searchTerm = params.get("q") || "";
  const debouncedQ = useDebounce(searchTerm, 400);

  const { data, isLoading, isError } = useQuery(
    ["search", { q: debouncedQ }],
    searchGithub,
    {
      staleTime: 60 * 60 * 1000,
      enabled: debouncedQ.length > 0,
    }
  );

  const handleSetQuery = (e: any) => {
    urlDispatch({ type: "set", payload: { key: "q", value: e.target.value } });
  };

  const numberOfPages = Math.ceil(data?.data?.total_count / 10) ?? 0;
  const showPagination = numberOfPages > 1;
  console.log(isLoading);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Container>
            <TextField
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
        {data?.data && <h1>Total count: {data?.data?.total_count}</h1>}
        {data?.data?.items.map((item: any) => {
          return <UserCard key={item.login} username={item.login} />;
        })}
        {showPagination && <Pagination count={numberOfPages} />}
      </Container>
    </div>
  );
}

export default App;
