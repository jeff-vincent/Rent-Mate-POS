import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const TEST_IMAGE =
  "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

const useStyles = makeStyles({
  root: {
    display: "grid",
    width: "400px",
    height: "300px",
    marginBottom: "2rem",
  },
  imageContainer: {
    backgroundImage: (props) =>
      `url(${props.currentCampaign?.file_url || props.form?.file_url || ""})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: (props) => (props.isFacebook ? "0px" : "15px"),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  textContent: {
    backgroundColor: "rgba(70,70,70,.80)",
    width: "fit-content",
    padding: "1rem",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "80%",
  },
  text: {
    fontSize: "14pt",
    fontWeight: 800,
    color: "white",
  },
  actionButton: {
    backgroundColor: "#ff4750",
    color: "white",
    textTransform: "uppercase",
    fontSize: "10pt",
    fontWeight: 700,
    padding: ".5rem 2rem",
    "&:hover": {
      backgroundColor: "#ff4750",
    },
  },
});

const CampaignImageDisplay = (props) => {
  const classes = useStyles(props);
  return (
    <Box
      className={classes.imageContainer}
      height={props.isFacebook ? "200px" : "350px"}
    >
      <Box>
        <Box className={classes.textContent}>
          <Typography className={classes.text}>
            {props.currentCampaign?.ad_description ||
              props.form?.ad_description}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.buttonContent}>
        <Button className={classes.actionButton}>{props.form?.ad_cta}</Button>
      </Box>
    </Box>
  );
};

export default CampaignImageDisplay;
