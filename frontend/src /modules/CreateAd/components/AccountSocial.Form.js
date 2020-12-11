import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import {
  InputMainLabel,
  FacebookIcon,
  GoogleIcon,
} from "../../../sharedComponents/components";

import mailChimpIcom from "../../../img/mailChimp.png";
import SocialItem from "./ConnectSocial.SocialItem";

const useStyles = makeStyles({
  root: {
    width: "400px",
    padding: "2rem",
    // background: "#e2e2e2",
  },
  socialItem: {
    fontWeight: 800,
    textAlign: "center",
    filter: "opactity(.8)",
    cursor: "pointer",
    borderBottom: "2px solid #fff",
  },
  selected: {
    fontWeight: 800,
    textAlign: "center",
    borderBottom: "2px solid #ff579d",
    cursor: "pointer",
  },
});

const ConnectSocialForm = ({handleUpdateSocial,}, props) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [loggedInFacebook, setLoggedInFacebook] = React.useState(false);
  const [loggedInGoogle, setLoggedInGoogle] = React.useState(false);
  
  // console.log('PROPS::::', props)
  const selectSocial = (name) => {
    const nameRemoved = selected.filter((i) => i !== name);
    const nameAdded = [...selected, name];

    !selected.includes(name)
      ? setSelected(nameAdded)
      : setSelected(nameRemoved);

    props.handleUpdateSocial(name);
  };

  const setSocial = (isChecked, socialName) => {
    if (!loggedInFacebook && socialName === "Facebook Ad") {

    } else if (!loggedInGoogle && socialName === "Google Adwords") {
  
    }
    const socialRemoved = selected.filter((i) => i !== socialName);
    const socialAdded = [...selected, socialName];

    isChecked ? setSelected(socialAdded) : setSelected(socialRemoved);
  };

  React.useEffect(() => {
    handleUpdateSocial(selected);
  }, [selected]);

  return (
    <div>
      <InputMainLabel>Social Platforms</InputMainLabel>
      <Typography>
        Choose which platforms you want to publish to your ad to. Templates are
        optimized for each, but be sure to double check if you changed any media
        or text content
      </Typography>
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <SocialItem
          isConnected
          site="facebook"
          displayName="Facebook Feed"
          handleCheck={(isChecked) => setSocial(isChecked, "facebook feed")}
          // isChecked
          //   ? setSelected([selected, "facebook feed"])
          //   : setSelected(selected.filter((i) => i !== "facebook feed"))

          {...props}
        />
        <SocialItem
          site="facebook"
          displayName="Facebook Ad"
          handleCheck={(isChecked) => setSocial(isChecked, "facebook ad")}
          {...props}
        />
        <SocialItem
          isConnected
          site="google"
          displayName="Google Adwords"
          handleCheck={(isChecked) => setSocial(isChecked, "google adwords")}
          {...props}
        />
      </Box>
      <Box>{/* <GoogleLogin /> */}</Box>
    </div>
  );
};

export default ConnectSocialForm;
