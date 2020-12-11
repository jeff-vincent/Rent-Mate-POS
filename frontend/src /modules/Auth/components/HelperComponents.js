import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { CircularProgress } from "@material-ui/core";
import { indigo } from '@material-ui/core/colors';

/**
 * General about these components:
 * Because we are using hooks, its return type is determined by the
 * formState (apiStates), depending on the formState it renders different components.
 * 
 * Helper functions:
    * determinedErrorTypes: determines the errors being returned by different
    * register types (GoogleSignUp, NormalSignup, FBSignUp etc).
    * 
    * StatusComponent:
    * Component that tells user if error, loading, success etc.
    
 *  
 */

const errorParsing = errorMessage => {
    return errorMessage.length > 100 ? 
    errorMessage.substring(0, 50) :
    errorMessage;
}

const LoadingSpinner = () => (
    <div>
      <CircularProgress style={{ marginTop: '300px' }} size={120} />
    </div>
  );
  
  const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    UNSET: 'UNSET'
  };

  const determinedErrorTypes = (errorData) => {
    if(!errorData || !errorData.hasOwnProperty('response')) return [];

    const errorInfo = errorData?.response?.data, 
          errorArray = []; 
    if(typeof errorInfo === 'object'){
      if(errorInfo.hasOwnProperty('email')){
        errorArray.push(errorInfo.email)
      } else if(errorInfo.hasOwnProperty('username')){
        errorArray.push(errorInfo.username)
      } else if(errorInfo.hasOwnProperty('password')) {
        errorArray.push(errorInfo.password)
      } else if(errorInfo.hasOwnProperty('non_field_errors')){
        errorArray.push(errorInfo.non_field_errors)
      } 
    } else if(typeof errorInfo === 'string'){
      if(errorInfo.length > 100){
        errorArray.push(errorInfo.substring(0, 100))  
      } else{
        errorArray.push(errorInfo)
      }
    } else {
      const unspecifiedErrorMessage = `
        An error has occured, choose a different 
        method of sign up. 
      `;
      errorArray.push(unspecifiedErrorMessage);
    }
    return errorArray;
  }

  const StatusComponent = ({state, errorData}) => {
    if(state === apiStates.SUCCESS){
      return(
        <div>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            You have been registered! Welcome to <strong>EzAD!</strong>
            </Alert>
          <LoadingSpinner />
        </div>
      )
    } else if(state === apiStates.ERROR){
      const errorAlerts = determinedErrorTypes(errorData);
      return(
        <div>
          <Alert severity="error">
          <AlertTitle>The following error has occured:</AlertTitle>
            {errorAlerts && errorAlerts.map(alert => (
              <Alert severity="error">{alert}</Alert>
            ))}
          </Alert>
        </div>
      )
    } else if(state === apiStates.LOADING){
      return <LoadingSpinner />;
    } else {
      return <div />;
    }
  }

export{
    errorParsing,
    LoadingSpinner,
    apiStates,
    determinedErrorTypes,
    StatusComponent
}