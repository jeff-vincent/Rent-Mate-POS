import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FacebookSocialDisplay from "./ConnectSocial.Display.Facebook";
import GoogleSocialDisplay from "./ConnectSocial.Display.Google";

const useStyles = makeStyles({
  header: {
    textAlign: "left",
    marginBottom: "1rem",
  },
});

const SocialDisplays = (props) => {
  const classes = useStyles();
  // React.useEffect(() => {
  //   console.log(props.socialsToPost);
  // }, [props.socialsToPost]);

  return (
    <div>
      {props.socialsToPost?.length ? (
        <div>
          {(props.socialsToPost?.includes("facebook ad") ||
            props.socialsToPost?.includes("facebook feed")) && (
            <Box marginBottom={3}>
              <FacebookSocialDisplay {...props} />
            </Box>
          )}

          {props.socialsToPost?.includes("google adwords") && (
            <Box marginBottom={3}>
              <GoogleSocialDisplay {...props} />
            </Box>
          )}
        </div>
      ) : (
        <div>select a social media type to preview ad</div>
      )}
    </div>
  );
};

export default SocialDisplays;
