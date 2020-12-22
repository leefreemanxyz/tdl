import {
  Card,
  Typography,
  CardContent,
  CardActionArea,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "react-query";
import axios from "axios";
const getUserDetail = ({ queryKey }: { queryKey: any }) => {
  const [_, { username }] = queryKey;
  return axios.get(`http://localhost:3001/user/${username}`);
};

function UserCard({ username }: { username: string }) {
  const { data, isLoading, isError } = useQuery(
    ["userDetail", { username }],
    getUserDetail,
    {
      staleTime: 60 * 60 * 1000,
    }
  );
  console.log({ data, isLoading, isError, username });
  const user = data?.data ?? false;

  return user ? (
    <Card>
      <CardContent>
        <CardActionArea>
          <Typography variant="h5" component="h2">
            <Avatar alt="" src={user.avatar_url} />
            {user.login}
            {user.name}
            {user.company}
            {user.location}
            {user.html_url}
            {user.bio}
            {user.blog}
            {user.twitter_username}
          </Typography>
          <Typography>Followers: {user.followers}</Typography>
          <Typography>Following: {user.following}</Typography>
          <Typography>Repos: {user.public_repos}</Typography>
          <Typography>Gists: {user.public_gists}</Typography>
        </CardActionArea>
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardContent>
        <CardActionArea>
          <CircularProgress />
        </CardActionArea>
      </CardContent>
    </Card>
  );
}

export default UserCard;
