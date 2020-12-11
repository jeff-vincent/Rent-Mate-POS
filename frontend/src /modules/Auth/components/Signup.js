import React, {useEffect} from "react";
import { Box, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import {GOOGLE_OAUTH2_KEY} from '../../../environmentVariables';
import { connect } from 'react-redux';

import LargeInput from "../../../sharedComponents/components/LargeInput";
import RoundedButton from "../../../sharedComponents/components/RoundedButton";

import {
  errorParsing,
  LoadingSpinner,
  apiStates,
  determinedErrorTypes,
  StatusComponent
} from './HelperComponents'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px",
    padding: theme.spacing(4),
    borderRadius: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    padding: theme.spacing(2),
  },
  successComponent: {
    margin: '0 auto'
  }
}));


const Signup = ({ 
  handleFbSignup, 
  isAuthenticated,
  redirectAfterSignUp 
}) => {
  const classes = useStyles();
  const [password, setPassword] = React.useState("");
  const { control, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [formState, setFormState] = React.useState({
    state: apiStates.UNSET,
    successMessage: "You have been registered, welcome to EzAd!",
    errorMessage: "",
    errorData: {},
    data: {},
    isFormSubmitted: false,
  });

  const responseGoogle = async (response) => {
    if(response.hasOwnProperty('accessToken')){
      const { accessToken } = response;
      const verifiedAccessToken = await axios.post(
        'http://localhost:8000/api/social/google-oauth2', {
          access_token: accessToken 
      }).then((response) => {
        redirectAfterSignUp(response.data);
      }).catch((error) => {
        setFormState({
          ...formState,
          state: apiStates.ERROR,
          error: error.message,
          errorData: error  
        })
      })
    } else {
      setFormState({
        ...formState,
        error: 'User could not be validated, choose another Signup method.',
      })
    }  
  }

  useEffect(() => {
    if (formState.state === apiStates.SUCCESS) {
      history.push("/onboarding/1");
    }
  }, [formState.state]);

  useEffect(() => {
    const registerUser = async ({email, password, userName}) => {
      setFormState({ ...formState, state: apiStates.LOADING });
      const postData = await axios.post('http://localhost:8000/api/auth/register', {
       username: userName, password, email
      }).then((response) => {
        setFormState({...formState, state: apiStates.SUCCESS });
        debugger;
        redirectAfterSignUp(response.data);
      }).catch((error) => {
        setFormState({
          ...formState, 
          state: apiStates.ERROR, 
          errorMessage: error.message,
          errorData: error
        });  
      });
    }
    if(formState.isFormSubmitted === true) registerUser(formState.data);
  }, [formState.isFormSubmitted])

  
  if(formState.state === apiStates.LOADING){
    return <StatusComponent state={apiStates.LOADING} />;
  } else if(formState.state === apiStates.SUCCESS){
    return(
      <StatusComponent state={apiStates.SUCCESS} />
    )
  }else if(formState.state === "UNSET"){
    return (
      <>
        <form onSubmit={handleSubmit((data) => {
          setFormState({...formState, data: data, isFormSubmitted: true })
        })}>
          <Paper className={classes.root}>
            <form>
              <Box display="flex" justifyContent="center">
                <Typography>
                  <strong>Sign up now!</strong>
                </Typography>
              </Box>
              <Box marginTop={3}>
                <Controller
                  as={<LargeInput placeholder="User Name" />}
                  name="userName"
                  control={control}
                  rules={{ required: true }}
                />
                <Controller
                  as={<LargeInput placeholder="Email Address" />}
                  name="email"
                  control={control}
                  rules={{ required: true }}
                />
                <LargeInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Controller
                  as={<LargeInput placeholder="Confirm Password" />}
                  name="password"
                  control={control}
                  rules={{
                    validate: (val) => val === password || "Passwords do not match",
                  }}
                />
                <Typography color="error">{errors?.password?.message}</Typography>
              </Box>
              <Box marginTop={3} display="flex" justifyContent="center">
                <GoogleLogin
                  clientId={GOOGLE_OAUTH2_KEY}
                  buttonText="Signup with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <Button
                  className={classes.actionBtn}
                  onClick={handleFbSignup}
                  variant="contained"
                  color="primary"
                >
                  Signup with facebook
                </Button>
                <RoundedButton size="large" type="submit">
                  Signup
                </RoundedButton>
              </Box>
            </form>
          </Paper>
        </form>
      </>
    );
  } else if(formState.state === "ERROR"){
    return (
      <>
        <form onSubmit={handleSubmit((data) => {
          setFormState({...formState, data: data, isFormSubmitted: true })
        })}>
          <Paper className={classes.root}>
            <form>
              <Box display="flex" justifyContent="center">
                <Typography>
                  <strong>Sign up now!</strong>
                </Typography>
              </Box>
              <Box marginTop={3}>
                <Controller
                  as={<LargeInput placeholder="User Name" />}
                  name="userName"
                  control={control}
                  rules={{ required: true }}
                />
                <Controller
                  as={<LargeInput placeholder="Email Address" />}
                  name="email"
                  control={control}
                  rules={{ required: true }}
                />
                <LargeInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Controller
                  as={<LargeInput placeholder="Confirm Password" />}
                  name="password"
                  control={control}
                  rules={{
                    validate: (val) => val === password || "Passwords do not match",
                  }}
                />
                <Typography color="error">{errors?.password?.message}</Typography>
              </Box>
              <Box marginTop={3} display="flex" justifyContent="center">
              <GoogleLogin
                clientId={GOOGLE_OAUTH2_KEY}
                buttonText="Signup with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
                <Button
                  className={classes.actionBtn}
                  onClick={handleFbSignup}
                  variant="contained"
                  color="primary"
                >
                  Signup with facebook
                </Button>
                <RoundedButton size="large" type="submit">
                  Signup
                </RoundedButton>
              </Box>
            </form>
          </Paper>
        </form>
        <StatusComponent 
          state={apiStates.ERROR} 
          errorData={formState.errorData}        
        />
      </>
    )
  }
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated})

const mapDispatchToProps = dispatch => ({
  redirectAfterSignUp: data => dispatch({ 
    type: 'LOGIN_SUCCESS', 
    payload: data 
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
