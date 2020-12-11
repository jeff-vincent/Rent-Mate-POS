import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Dropdown } from "semantic-ui-react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { updateBasicInfoName, updateBasicInfoBusiness, updateBasicInfoWebsite, updateBasicInfoStreet, updateBasicInfoCity, updateBasicInfoState, updateBasicInfoZip } from '../../../actions/basicInfoActions';


const BasicInfoForm = ({ handleUpdateInfo, handleErrors, updateBasicInfoName, updateBasicInfoBusiness, updateBasicInfoWebsite, updateBasicInfoStreet, updateBasicInfoCity, updateBasicInfoState, updateBasicInfoZip, personalName, businessName, websiteURL, streetAddress, city, stateCode, zipCode  }) => {
  
  return (
    <>
      <Box marginTop={3}>
        <Typography>
          <strong>Personal</strong>
        </Typography>
      </Box>
      <Box marginTop={3}>
        <Input placeholder="First and Last Name" name="personalName"
          value={personalName} onChange={(e) => updateBasicInfoName(e.target.value)} />
      </Box>
      <Box marginTop={3}>
        <Typography>
          <strong>Business</strong>
        </Typography>
      </Box>
      <Box>
        <Box marginTop={2}>
          <Input placeholder="Business Name" name="businessName" value={businessName} onChange={(e) => updateBasicInfoBusiness(e.target.value)} />
        </Box>
        <Box marginTop={2}>
          <Input placeholder="Website URL" name="websiteURL"
          value={websiteURL} onChange={(e) => updateBasicInfoWebsite(e.target.value)} />
        </Box>
        <Box marginTop={2}>
          <Input placeholder="Street Address" name="streetAddress"
          value={streetAddress} onChange={(e) => updateBasicInfoStreet(e.target.value)} />
        </Box>
        <Box display="flex" marginTop={2}>
          <Box marginRight={2}>
            <Input placeholder="City" name="city"
          value={city} onChange={(e) => updateBasicInfoCity(e.target.value)} />
          </Box>
          <Box>
            <Dropdown placeholder="State"  name="stateCode"
          value={stateCode} onChange={(e) => updateBasicInfoState(e.target.value)} compact selection />
          </Box>
        </Box>
        <Box marginTop={2}>
          <Input placeholder="Country" name="zipCode"
          value={zipCode} onChange={(e) => updateBasicInfoZip(e.target.value)} />
        </Box>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => ({
  personalName: state.basicInfo.personalName,
  businessName: state.basicInfo.businessName,
  websiteURL: state.basicInfo.websiteURL,
  streetAddress: state.basicInfo.streetAddress,
  city: state.basicInfo.city,
  stateCode: state.basicInfo.stateCode,
  zipCode: state.basicInfo.zipCode,
});

export default connect(mapStateToProps, { updateBasicInfoName, updateBasicInfoBusiness, updateBasicInfoWebsite, updateBasicInfoStreet, updateBasicInfoCity, updateBasicInfoState, updateBasicInfoZip })(BasicInfoForm);
