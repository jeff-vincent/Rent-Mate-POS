import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
});

const FormContent1 = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <TextField
      ref={ref}
      variant="outlined"
      fullWidth={props.small ? false : true}
      {...props}
    />
  );
});

export default FormContent1;
