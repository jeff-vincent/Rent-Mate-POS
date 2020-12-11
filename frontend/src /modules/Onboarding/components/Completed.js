import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";

import OutlinedButton from "../../../sharedComponents/components/OutlinedButton";

const Completed = () => {
  const history = useHistory();
  const onDoneClick = () => {
    history.push(`/`);
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width="350px" textAlign="center">
        <Typography variant="h4">
          <strong>Profile Created!</strong>
        </Typography>
        <Box marginTop={3} marginBottom={3}>
          <Typography variant="h5">
            Finish filling out your Profile to make creating ads even easier
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column" width="150px">
            <Button onClick={onDoneClick} variant="contained" color="primary">
              Fill out Profile
            </Button>
            <Box marginTop={2} />
            <OutlinedButton onClick={onDoneClick} width="150px">Done</OutlinedButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Completed;
