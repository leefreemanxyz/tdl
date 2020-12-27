import { Container, Grid } from "@material-ui/core";
import { Pagination as MUIPagination } from "@material-ui/lab";

const Pagination = ({
  numberOfPages,
  page,
  handleChangePage,
}: {
  numberOfPages: number;
  page: number;
  handleChangePage: any;
}) => {
  return (
    <Container>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <MUIPagination
            count={numberOfPages}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Pagination;
