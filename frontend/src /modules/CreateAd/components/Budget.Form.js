import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import {
  Input,
  InputMainLabel,
  InputSmallLabel,
} from "../../../sharedComponents/components";
import SocialDisplays from "./ConnectSocial.Displays";

const BudgetForm = ({ handleSubmitBudget, socialsToAdd }) => {
  const history = useHistory();
  const [amount, setAmount] = useState("10.00");
  const [objective, setObjective] = useState(
    "Make people aware of my business"
  );

  const nextClick = () => {
    handleSubmitBudget({ amount, objective });

    if (!socialsToAdd || !socialsToAdd.length) history.push("/create/summary");
    else if (
      socialsToAdd.includes("facebook feed") ||
      socialsToAdd.includes("facebook ad")
    ) {
      history.push("/create/facebook");
    } else if (socialsToAdd.includes("google adwords")) {
      history.push("/create/google");
    }
  };

  return (
    <Box textAlign="left">
      <InputMainLabel>Campaign</InputMainLabel>
      <Typography>
        Campaign options include your objective, budget, and promotion timeframe
      </Typography>
      <Box marginTop="1rem">
        <InputMainLabel>Budget</InputMainLabel>
        <Input
          small
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          defaultValue="10.00"
        />
        <InputSmallLabel>
          Whats the max amount you want to spend
        </InputSmallLabel>
      </Box>
      {/* TODO: add timeline */}
      <Box marginTop="1rem">
        <InputMainLabel>Objective</InputMainLabel>
        <RadioGroup
          aria-label="distance"
          name="distance"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        >
          <FormControlLabel
            value="Make people aware of my business"
            control={<Radio />}
            label="Make people aware of my business"
          />
          <FormControlLabel
            value="Aquire new customers"
            control={<Radio />}
            label="Aquire new customers"
          />
          <FormControlLabel
            value="Generate web traffic"
            control={<Radio />}
            label="Generate web traffic"
          />
          <FormControlLabel
            value="Retain my current customers"
            control={<Radio />}
            label="Retain my current customers"
          />
          <FormControlLabel
            value="All of the above"
            control={<Radio />}
            label="All of the above"
          />
          <FormControlLabel
            value="Not sure"
            control={<Radio />}
            label="Not sure"
          />
        </RadioGroup>
      </Box>
      <Box marginTop={3} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/create/targeting")}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={nextClick}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default BudgetForm;
