import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  Chip,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InputMainLabel } from "../../../sharedComponents/components";

const useStyles = makeStyles({
  chip: {
    marginTop: ".3rem",
    marginBottom: ".3rem",
    marginRight: ".5rem",
  },
});

const TargetingInfo = ({ handleSumbitTargetInfo, addresses }) => {
  const history = useHistory();
  const classes = useStyles();
  const [distance, setDistance] = useState("local");
  const [tagInput, setTagInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState([]);

  const [tags, setTags] = useState([
    "Lorem ipsum",
    "dolor sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
  ]);

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const addInterest = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInterests([...interests, interestInput]);
      setInterestInput("");
    }
  };

  const nextClick = () => {
    handleSumbitTargetInfo({ distance, interests, tags });
    history.push("/create/budget");
  };

  return (
    <Box>
      <InputMainLabel>Audience</InputMainLabel>
      <Box>
        <Typography>
          Our AI will help determine who to show your ad to based on your
          industry, business size, locality and several other factors
        </Typography>
      </Box>
      <Box marginTop="2rem">
        <InputMainLabel>Customer Distance</InputMainLabel>
        <RadioGroup
          aria-label="distance"
          name="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        >
          <FormControlLabel
            value="local"
            control={<Radio />}
            label="Local (5 miles)"
          />
          <FormControlLabel
            value="drive"
            control={<Radio />}
            label="A drive away (150 miles)"
          />
          <FormControlLabel
            value="nationwide"
            control={<Radio />}
            label="nationwide"
          />
          <FormControlLabel
            value="anywhere"
            control={<Radio />}
            label="anywhere"
          />
        </RadioGroup>
      </Box>

      <Box marginTop="2rem">
        <InputMainLabel>Audience Interests</InputMainLabel>
        <Input
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          placeholder="add interests"
          onKeyPress={addInterest}
        />
        <Box marginTop="1rem">
          {interests.map((int) => (
            <Chip className={classes.chip} label={int} />
          ))}
        </Box>
      </Box>
      <Box marginTop="2rem">
        {/* <InputMainLabel>Audience Tags</InputMainLabel>
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="add tags"
          onKeyPress={addTag}
        />
        <Box marginTop="1rem">
          {tags.map((tag) => (
            <Chip className={classes.chip} label={tag} />
          ))}
        </Box> */}
        <Box marginTop={3} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/create/connect-social")}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={nextClick}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TargetingInfo;
