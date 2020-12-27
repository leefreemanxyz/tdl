import { makeStyles, TextField as MUITextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.light,
    },
    backgroundColor: "rgba(255,255,255, 0.85)",
    padding: theme.spacing(1),
    borderRadius: "2px",
  },
}));

const TextField = ({
  searchTerm,
  onChange,
}: {
  searchTerm: string;
  onChange: any;
}) => {
  const classes = useStyles();
  return (
    <MUITextField
      className={classes.root}
      data-testid="search-input"
      placeholder="Search"
      onChange={onChange}
      value={searchTerm}
      fullWidth
    />
  );
};

export default TextField;
