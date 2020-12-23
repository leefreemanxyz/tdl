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
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const getUserDetail = ({ queryKey }: { queryKey: any }) => {
  const [_, { username }] = queryKey;
  return axios.get(`http://localhost:3001/user/${username}`);
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
      <Card className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid
              container
              xs={4}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Avatar
                  className={classes.large}
                  alt=""
                  src={user.avatar_url}
                />
              </Grid>
              <Grid item>
                <Typography>{user.login}</Typography>
              </Grid>
              <Grid item>
                <Typography>{user.name}</Typography>
              </Grid>
              <Grid item>
                <Typography>{user.location}</Typography>
              </Grid>
            </Grid>
            <Grid container xs={8} direction="column" justify="space-between">
              <Grid>
                <Typography variant="body1">
                  {user.bio || "No user bio 😭"}
                </Typography>
              </Grid>
              <Grid item>
                {user.company && <Chip label={`Works for: ${user.company}`} />}
                {user.followers && (
                  <Chip label={`Followers: ${user.followers}`} />
                )}
                {user.following && (
                  <Chip label={`Following: ${user.following}`} />
                )}
                {user.public_repos && (
                  <Chip label={`Public repos: ${user.public_repos}`} />
                )}
                {user.public_gists && (
                  <Chip label={`Public gists: ${user.public_gists}`} />
                )}
              </Grid>
              <Grid>
                {user.twitter_username && (
                  <Link href={`https://twitter.com/${user.twitter_username}`}>
                    <Chip
                      clickable
                      icon={<Twitter />}
                      label={`@${user.twitter_username}`}
                    />
                  </Link>
                )}
                {user.blog && (
                  <Link href={user.blog}>
                    <Chip clickable icon={<Web />} label="Personal site" />
                  </Link>
                )}
                {user.html_url && (
                  <Link href={user.html_url}>
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
