import React from "react";
import { connect } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import BasicInfoForm from "../components/BasicInfoForm";
import OnboardingPageWrapper from "../components/OnboardingPageWrapper";
import { addAddresses } from '../../../actions/userInfoActions'; 
import { addBusinessInfo } from '../../../actions/businessInfoActions'; 


const Onboarding1 = ({ personalName, businessName, businessUrl, streetAddress, city, stateCode, zipCode, addAddresses, addBusinessInfo }) => {
  const nextClick = () => {
    let businessInfoFormData = new FormData()
    if (businessName) {
      businessInfoFormData.append('businessName', businessName)
    }
    if (streetAddress) {
      businessInfoFormData.append('streetAddress', streetAddress)
    }
    if (city) {
      businessInfoFormData.append('city', city)
    }
    if (stateCode) {
      businessInfoFormData.append('stateCode', stateCode)
    }
    if (zipCode) {
      businessInfoFormData.append('zipCode', zipCode)
    }
    if (businessUrl) {
      businessInfoFormData.append('businessName', businessName)
    }
    
    addBusinessInfo(businessInfoFormData);
  }
  return (
    <OnboardingPageWrapper
      header="Basic Info"
      content="basic info information para"
      handleNextClick={nextClick}
    >
      <BasicInfoForm  />
    </OnboardingPageWrapper>
  );
};

const mapStateToProps = (state) => ({
  personalName: state.basicInfo.personalName,
  businessName: state.basicInfo.businessName,
  businessUrl: state.basicInfo.businessUrl,
  streetAddress: state.basicInfo.streetAddress,
  city: state.basicInfo.city,
  stateCode: state.basicInfo.stateCode,
  zipCode: state.basicInfo.zipCode,
});

export default connect(mapStateToProps, {
  addAddresses,
  addBusinessInfo,
})(Onboarding1);