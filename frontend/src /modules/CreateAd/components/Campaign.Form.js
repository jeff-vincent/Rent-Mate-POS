import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  Input,
  InputMainLabel,
  InputSmallLabel,
} from "../../../sharedComponents/components";
import ThumbnailImage from "./Campaign.ThumbnailImage";
import Cropper from "./Campaign.Cropper";

const STORE_IMG =
  "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80";

const COFFEE_IMG =
  "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

const CLOTHES_IMG =
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80";

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: "1.5rem",
  },
  randomRow: {
    backgroundColor: theme.palette.primary.light,
    padding: "1rem 2rem",
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "15px",
  },
  notSel: {
    padding: ".3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    padding: ".3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "auto",
    borderRadius: "50%",
  },
}));

const FormContent1 = ({ clicked, handleUpdateForm, currentCampaign }) => {
  const classes = useStyles();
  const location = useLocation();

  const [randomTerm, setRandomTerm] = React.useState("");
  const [formInfo, setFormInfo] = useState({
    title: "",
    headline: "",
    ad_description: "Description goes here",
    ad_cta: "Find out more",
    ad_link: "",
    file_url: DEFAULT_IMAGE,
  });
  const [previewUrl, setPreviewUrl] = useState();

  const getRandom = (term) => {
    const collections = {
      restaurants:
        "https://images.unsplash.com/photo-1541795795328-f073b763494e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      pets:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      sports:
        "https://images.unsplash.com/photo-1560012057-4372e14c5085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      bar:
        "https://images.unsplash.com/photo-1505104805083-91fe4b9e14df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      clothing:
        "https://images.unsplash.com/photo-1524275461690-a79bfeaf1f3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      coffee:
        "https://images.unsplash.com/photo-1500353391678-d7b57979d6d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    };
    setRandomTerm(term);
    setFormInfo({ ...formInfo, file_url: collections[term] });
  };

  const handleFormChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const updateImage = (image) => {
    setFormInfo({ ...formInfo, file_url: image });
  };

  React.useEffect(() => {
    handleUpdateForm(formInfo);
  }, [formInfo]);
  React.useEffect(() => {
    updateImage(previewUrl);
  }, [previewUrl]);

  return (
    <Box>
      <InputMainLabel>Content</InputMainLabel>
      <Input
        placeholder="Campaign Name"
        name="campaign_name"
        onChange={handleFormChange}
        value={formInfo.campaign_name}
        defaultValue={currentCampaign?.campaign || ""}
      />
      <InputSmallLabel>The name of your campaign</InputSmallLabel>
      <Input
        placeholder="The perfect something"
        className={classes.input}
        name="ad_description"
        onChange={handleFormChange}
        defaultValue={currentCampaign?.ad_description || ""}
        multiline
      />
      <InputSmallLabel>
        Text why people should engage with your business
      </InputSmallLabel>
      <Input
        placeholder="Web address"
        name="url"
        onChange={handleFormChange}
        value={formInfo.url}
        className={classes.input}
        defaultValue={""}
      />
      <InputSmallLabel>The Url your ad will link to</InputSmallLabel>
      <Input
        placeholder="Call to action"
        name="ad_cta"
        onChange={handleFormChange}
        value={formInfo.ad_cta}
        className={classes.input}
        defaultValue={currentCampaign?.ad_cta || ""}
      />
      <InputSmallLabel>
        Text that will appear on the button (max 50 characters)
      </InputSmallLabel>
      <Box marginTop="2rem">
        <InputMainLabel>Pictures & Videos</InputMainLabel>
        <Box display="flex">
          <ThumbnailImage
            file={DEFAULT_IMAGE}
            onClick={() => updateImage(DEFAULT_IMAGE)}
            clicked={formInfo.file_url === DEFAULT_IMAGE}
          />
          <ThumbnailImage
            file={COFFEE_IMG}
            onClick={() => updateImage(COFFEE_IMG)}
            clicked={formInfo.file_url === COFFEE_IMG}
          />
          <ThumbnailImage
            file={STORE_IMG}
            onClick={() => updateImage(STORE_IMG)}
            clicked={formInfo.file_url === STORE_IMG}
          />
          <ThumbnailImage
            file={CLOTHES_IMG}
            onClick={() => updateImage(CLOTHES_IMG)}
            clicked={formInfo.file_url === CLOTHES_IMG}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="2rem"
          width="80%"
          className={classes.randomRow}
        >
          <span
            role="img"
            aria-label="restaurant icon"
            className={
              randomTerm === "restaurants" ? classes.selected : classes.notSel
            }
            onClick={() => getRandom("restaurants")}
          >
            🍕
          </span>
          <span
            role="img"
            aria-label="pets"
            className={
              randomTerm === "pets" ? classes.selected : classes.notSel
            }
            onClick={() => getRandom("pets")}
          >
            🐶
          </span>
          <span
            role="img"
            aria-label="sports"
            className={
              randomTerm === "sports" ? classes.selected : classes.notSel
            }
            onClick={() => getRandom("sports")}
          >
            🏈
          </span>
          <span
            role="img"
            aria-label="bar"
            className={randomTerm === "bar" ? classes.selected : classes.notSel}
            onClick={() => getRandom("bar")}
          >
            🍻
          </span>
          <span
            role="img"
            aria-label="clothing"
            className={
              randomTerm === "clothing" ? classes.selected : classes.notSel
            }
            onClick={() => getRandom("clothing")}
          >
            👔
          </span>
          <span
            role="img"
            aria-label="coffee"
            className={
              randomTerm === "coffee" ? classes.selected : classes.notSel
            }
            onClick={() => getRandom("coffee")}
          >
            ☕️
          </span>
        </Box>
        <Box marginTop="1rem">
          <Cropper setPreviewUrl={setPreviewUrl} previewUrl={previewUrl} />
        </Box>
      </Box>
    </Box>
  );
};

export default FormContent1;
