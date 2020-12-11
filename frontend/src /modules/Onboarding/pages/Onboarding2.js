import React from "react";
import OnboardingPageWrapper from "../components/OnboardingPageWrapper";
import ConnectSocialForm from "../components/ConnectSocialForm";

const Onboarding2 = () => {
  const nextClick = () => {
    // let googleFormData = new FormData()

    // if (businessName) {
    //   googleFormData.append('businessName', businessName)
    // }
    // if (streetAddress) {
    //   googleFormData.append('streetAddress', streetAddress)
    // }
    // GoogleConnect(googleFormData);
    // let facebookFormData = new FormData()
    // if (businessName) {
    //   facebookFormData.append('businessName', businessName)
    // }
    // // Add address to facebookFormData
    // let address = ''
    // if (address) {
    //   facebookFormData.append('streetAddress', streetAddress)
    // }
  }
  return (
    <OnboardingPageWrapper
      header="Connect your social accounts"
      content="Connect information para"
      handleNextClick={nextClick}
    >
      <ConnectSocialForm />
    </OnboardingPageWrapper>
  );
};


export default Onboarding2;
