import React from "react";

import CampaignImageDisplay from "./Campaign.ImageDisplay";
import facebook_t from "../../../img/facebook_t.png";
import facebook_b from "../../../img/facebook_b.png";
const MOCK_FORM = {
  file:
    "https://images.unsplash.com/photo-1598054437544-d81eea4b1fd0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600",
  ad_link: "go here",
  ad_description: "something goes here",
};

const FacebookSocialDisplay = ({ currentCampaign }) => {
  return (
    <div>
      <img src={facebook_t} width="400px" />
      <CampaignImageDisplay
        currentCampaign={currentCampaign}
        form={currentCampaign}
        height="200px"
        isFacebook
      />
      <img src={facebook_b} width="400px" />
    </div>
  );
};

export default FacebookSocialDisplay;
