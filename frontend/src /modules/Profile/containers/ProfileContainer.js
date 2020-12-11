import React from "react";

import Profile from "../components/Profile";

const MOCK_DATA = {
  basicInfo: {
    businessName: "ABC Company",
  },
};

const ProfileContainer = () => {
  return <Profile basicInfo={MOCK_DATA.basicInfo} />;
};

export default ProfileContainer;
