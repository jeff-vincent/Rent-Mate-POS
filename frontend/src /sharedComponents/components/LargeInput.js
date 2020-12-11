import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const LargeInput = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <TextField
      ref={ref}
      className={classes.input}
      fullWidth
      inputProps={{ style: { fontSize: 24 } }}
      InputLabelProps={{ style: { fontSize: 24 } }}
      {...props}
    />
  );
});

export default LargeInput;
