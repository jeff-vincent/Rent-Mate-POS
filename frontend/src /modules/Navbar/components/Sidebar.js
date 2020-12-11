import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dashboard,
  SubdirectoryArrowRight,
  AccessTime,
} from "@material-ui/icons/";
const useStyles = makeStyles((theme) => ({
  root: {},
  bar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    minHeight: "calc(100vh - 60px)",
  },
  item: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  content: {
    minWidth: "calc(100vw - 150px)",
    maxWidth: "500px",
    // padding: theme.spacing(5),
    paddingLeft: "5rem",
    paddingTop: "3rem",
  },
  icon: {
    marginRight: "15px",
  },
}));

const LoggedInSidebar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.root} display="flex">
      <Box
        className={classes.bar}
        display="flex"
        flexDirection="column"
        width="150px"
      >
        <Box
          display="flex"
          alignItems="center"
          className={classes.item}
          onClick={() => history.push("/dashboard")}
        >
          <Dashboard className={classes.icon} />
          <Typography>Dashboard</Typography>
        </Box>
        <Box
          className={classes.item}
          display="flex"
          alignItems="center"
          onClick={() => history.push("/create")}
        >
          <SubdirectoryArrowRight className={classes.icon} />
          <Typography>Create Ad</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          className={classes.item}
          onClick={() => history.push("/analytics")}
        >
          <AccessTime className={classes.icon} />
          <Typography>Analytics</Typography>
        </Box>
      </Box>
      <Box className={classes.content}>
        {/* <Box margin="5rem">{children}</Box> */}
        {children}
      </Box>
    </Box>
  );
};
export default LoggedInSidebar;
