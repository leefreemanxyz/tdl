import {
  Card,
  Link,
  Typography,
  CardContent,
  CardActionArea,
  Avatar,
  CircularProgress,
  Grid,
  makeStyles,
  Chip,
} from "@material-ui/core";
import { useQuery } from "react-query";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { GitHub, Twitter, Web } from "@material-ui/icons";
import { API_URL } from "../const";

const getValidUrl = (url = "") => {
  let newUrl = window.decodeURIComponent(url);
  newUrl = newUrl.trim().replace(/\s/g, "");

  if (/^(:\/\/)/.test(newUrl)) {
    return `http${newUrl}`;
  }
  if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
    return `http://${newUrl}`;
  }

  return newUrl;
};

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const getUserDetail = ({ queryKey }: { queryKey: any }) => {
  const [, { username }] = queryKey;
  return axios.get(`${API_URL}/user/${username}`);
};

function UserCard({ username }: { username: string }) {
  const classes = useStyles();
  const { data, isLoading, isError } = useQuery(
    ["userDetail", { username }],
    getUserDetail,
    {
      staleTime: 60 * 60 * 1000,
    }
  );
  const user = data?.data ?? false;

  if (isError) {
    return (
      <Card>
        <CardContent>
          <CardActionArea>
            <Alert severity="error">Something went wrong!</Alert>
          </CardActionArea>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <CardActionArea>
            <CircularProgress />
          </CardActionArea>
        </CardContent>
      </Card>
    );
  }

  return (
    user && (
      <Card data-testid="user-result" className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid
              container
              item
              xs={4}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Avatar
                  className={classes.large}
                  alt=""
                  src={user.avatar_url}
                />
              </Grid>
              <Grid>
                <Typography data-testid={`username-${user.login}`}>
                  {user.login}
                </Typography>
              </Grid>
              <Grid>
                <Typography>{user.name}</Typography>
              </Grid>
              <Grid>
                <Typography>{user.location}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={8}
              direction="column"
              justify="space-between"
            >
              <Grid>
                <Typography variant="body1">
                  {user.bio || "No user bio 😭"}
                </Typography>
              </Grid>
              <Grid>
                {user.company && <Chip label={`Works for: ${user.company}`} />}
                <Chip label={`Followers: ${user.followers}`} />
                <Chip label={`Following: ${user.following}`} />
                <Chip label={`Public repos: ${user.public_repos}`} />
                <Chip label={`Public gists: ${user.public_gists}`} />
              </Grid>
              <Grid>
                {user.twitter_username && (
                  <Link
                    data-testid={`twitter-${user.login}`}
                    href={`https://twitter.com/${user.twitter_username}`}
                  >
                    <Chip
                      clickable
                      icon={<Twitter />}
                      label={`@${user.twitter_username}`}
                    />
                  </Link>
                )}
                {user.blog && (
                  <Link
                    data-testid={`personal-${user.login}`}
                    href={getValidUrl(user.blog)}
                  >
                    <Chip clickable icon={<Web />} label="Personal site" />
                  </Link>
                )}
                {user.html_url && (
                  <Link
                    data-testid={`github-${user.login}`}
                    href={user.html_url}
                  >
                    <Chip clickable icon={<GitHub />} label="GitHub" />
                  </Link>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
}

export default UserCard;
