import React, {useState} from "react";
import { Box, Typography, Button, CircularProgress } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import GoogleLogin from "react-google-login";
import axios from 'axios';
import { connect } from 'react-redux';


import { GOOGLE_OAUTH2_KEY } from '../../../environmentVariables';
import LargeInput from "../../../sharedComponents/components/LargeInput";
import RoundedButton from "../../../sharedComponents/components/RoundedButton";
import FacebookConnect from './FacebookLogin'
import {
    errorParsing,
    LoadingSpinner,
    apiStates,
    determinedErrorTypes,
    StatusComponent
} from './HelperComponents'

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    width: "150px",
    marginTop: theme.spacing(2),
  },
}));

const Login = ({ 
  handleFbLogin, 
  loginSuccessAndRedirect,
  loginError,
}) => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const [formState, setFormState] = useState({
    errors: [],
    state: apiStates.UNSET
  });

  /**
   * This is the response form google login
   * @param { accessToken: string } 
   * */  
  const responseGoogle = async (response) => {
   if(response.hasOwnProperty('accessToken')){
     debugger;
    setFormState({ ...formState, state: apiStates.SUCCESS });
    const createUserWithGoogleLogin = axios.post(
      "http://localhost:8000/api/social/google-oauth2", {
        access_token: response.accessToken
      }
    ).then((res) => {
      localStorage.setItem("token", res.data.token);
      loginSuccessAndRedirect(res.data);
    })
     .catch((err) => {
      setFormState({ 
        ...formState, 
        state: apiStates.ERROR, 
        errorData: err 
      });   
     });

   } else {
    setFormState({ 
      ...formState, 
      state: apiStates.ERROR, 
      errorData: response.data 
    });
    loginError(response);
   }
  }
  
  /**
   * 
   * @param {data: {
   *   username: string,
   *   password: string
   * }} data 
   */
  const handleLoginSubmit = async (data) => { 
    const submitLoginCredentials = axios
      .post("http://localhost:8000/api/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setFormState({ ...formState, state: apiStates.SUCCESS });
        loginSuccessAndRedirect(res.data);
      })
      .catch((err) => {
        setFormState({ 
          ...formState, 
          state: apiStates.ERROR,
          errorData: err 
        });
        loginError(err);          
      });
  }
  
  if(formState.state === apiStates.LOADING){
    return <StatusComponent state={apiStates.LOADING} />;
  } else if(formState.state === apiStates.SUCCESS){
    return(
      <StatusComponent state={apiStates.SUCCESS} />
    )
  }else if(formState.state === "UNSET"){
  
  return (
    <form onSubmit={handleSubmit((data) => handleLoginSubmit(data))}>
      <Box marginLeft={5} marginRight={5}>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2">
            <strong>Log In</strong>
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Controller
            as={<LargeInput placeholder="Username" />}
            name="username"
            control={control}
            rules={{ required: true }}
          />
          <Controller
            as={<LargeInput placeholder="Password" />}
            name="password"
            control={control}
            rules={{ required: true }}
          />
        </Box>
        <Box
          marginTop={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <FacebookConnect
            handleFbLogin={handleFbLogin}
            />
            <GoogleLogin
              clientId={GOOGLE_OAUTH2_KEY}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          <RoundedButton
            className={classes.actionBtn}
            type="submit"
            color="primary"
          >
            Log In
          </RoundedButton>
        </Box>
      </Box>
    </form>
  );
  } else if(formState.state === "ERROR"){
    return (
    <form onSubmit={handleSubmit((data) => handleLoginSubmit(data))}>
      <Box marginLeft={5} marginRight={5}>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2">
            <strong>Log In</strong>
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Controller
            as={<LargeInput placeholder="Username" />}
            name="username"
            control={control}
            rules={{ required: true }}
          />
          <Controller
            as={<LargeInput placeholder="Password" />}
            name="password"
            control={control}
            rules={{ required: true }}
          />
        </Box>
        <Box
          marginTop={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <FacebookConnect
            handleFbLogin={handleFbLogin}
            />
            <GoogleLogin
              clientId={GOOGLE_OAUTH2_KEY}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          <RoundedButton
            className={classes.actionBtn}
            type="submit"
            color="primary"
          >
            Log In
          </RoundedButton>
        </Box>
      </Box>
      <StatusComponent 
        state={apiStates.ERROR} 
        errorData={formState.errorData}        
      />
    </form>
    )
  }
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  loginSuccessAndRedirect: data => dispatch({ 
    type: 'LOGIN_SUCCESS', 
    payload: data 
  }),
  loginError: err => dispatch({
    type: 'LOGIN_FAIL',
    payload: {
      isError: true,
      errorMessage: errorParsing(err.message)
    },
  })
});


export default connect(() => ({}), mapDispatchToProps)(Login);
