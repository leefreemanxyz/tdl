import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const MetaInfo = ({
  totalCount,
  showPagination,
  page,
  numberOfPages,
}: {
  totalCount: number;
  showPagination: boolean;
  page: number;
  numberOfPages: number;
}) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="space-between"
      alignItems="center"
    >
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
    </Grid>
  );
};

export default MetaInfo;
