import React, {useState, useEffect, useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import { tokenConfig } from '../../../actions/authActions';
import axios from 'axios';
import { apiStates, LoadingSpinner } from './HelperComponents';
import { object } from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManagedAccountStatusComponent = ({
    facebookState, googleState, infoState
}) => {
    if(infoState.isLoading){
        return(
            <Alert severity="info">
                {infoState.isLoadingMessage}
            </Alert>
        )
    } else if(infoState.error){
        return(
            <Alert severity="error">
                {infoState.errorMessage}
            </Alert>    
        )
    } else if(infoState.success){
        return(
            <Alert severity="success">
                {infoState.successMessage}
            </Alert>    
        )
    } else if(googleState.isLoading){
        return(
            <Alert severity="info">
                {googleState.isLoadingMessage}
            </Alert>
        )
    } else if(googleState.error){
        return(
            <Alert severity="error">
                {googleState.errorMessage}
            </Alert>    
        )
    } else if(googleState.success){
        return(
            <Alert severity="success">
                {googleState.successMessage}
            </Alert>    
        )

    } else if(facebookState.isLoading){
        return(
            <Alert severity="info">
                {facebookState.isLoadingMessage}
            </Alert>    
        )
    } else if(facebookState.error){
        return(
            <Alert severity="error">
                {facebookState.errorMessage}
            </Alert>    
        )
    } else if(facebookState.success){
        return(
            <Alert severity="success">
                {facebookState.successMessage}
            </Alert>    
        )
    } else return <div></div>
    
}



function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}


const initialStateForManagedReducer = {
    businessName: 'Johns Lemonade Stand',
    isManagedAccountFormSubmitted: false,
    state: {
        /**Later we will let the user know about individual creation, loading, and
         * error states for different businesses, right now we just want loading or error. 
          */
        isFinishedCreatingBusinesses: false,
        businessInfo: {
            success: false,
            successMessage: 'Retrieved Data Successfully',
            isLoading: false, 
            isLoadingMessage: 'Loading Data',
            error: false,
            errorMessage: err => {
                return `
                    Error in getting your Profile Account... ${err}
                `
            }
        },
        facebook: {
            success: false,
            successMessage: 'You have created a Facebook Business Account!',
            isLoading: false, 
            isLoadingMessage: 'Creating Facebook Business Account...',
            error: false,
            errorMessage: err => {
                return `
                    Error in Creating Facebook Business has occured... ${err}
                `
            }
        },
        google: {
            success: false,
            successMessage: 'You have created a Google Business Account!',
            isLoading: false,
            isLoadingMessage: 'Creating Google Business Account...',
            error: false,
            errorMessage: err => {
                return `
                    Error in Creating Google Business has occured... ${err}
                `
            }
        }
    }
}

const actionStates = {
    'GOOGLE_LOADING_STATE': 'GOOGLE_IS_LOADING_STATE',
    'GOOGLE_ERROR_STATE': 'GOOGLE_ERROR_STATE',
    'GOOGLE_SUCCESS_STATE': 'GOOGLE_SUCCESS_STATE',
    'FACEBOOK_SUCCESS_STATE': 'FACEBOOK_SUCCESS_STATE',
    'FACEBOOK_ERROR_STATE': 'FACEBOOK_ERROR_STATE',
    'FACEBOOK_LOADING_STATE': 'FACEBOOK_LOADING_STATE',
    'USER_PROFILE_LOADING_STATE': 'USER_PROFILE_LOADING',
    'USER_PROFILE_FAILURE_STATE': 'USER_PROFILE_FAILURE',
    'USER_PROFILE_SUCCESS_STATE': 'USER_PROFILE_SUCCESS',
    'IS_MANAGED_BUSINESSES_CREATED': 'IS_MANAGED_BUSINESSES_CREATED' 
};

/** Managed State reducer */
const managedStateReducer = (managedAccountState, action) => {
    switch(action.type){
        case actionStates.USER_PROFILE_LOADING_STATE:
            return {
                    ...managedAccountState,
                    state: {
                    ...managedAccountState.state,
                    businessInfo: {
                        ...managedAccountState.state.businessInfo,
                        isLoading: true
                    }
                }

            }
        case actionStates.USER_PROFILE_FAILURE_STATE:
            return {
                ...managedAccountState,
                state: {
                    ...managedAccountState.state,
                   businessInfo: {
                       ...managedAccountState.state.businessInfo,
                       error: true,
                       isLoading: false,
                       success: false,
                       errorMessage: managedAccountState.state.businessInfo.errorMessage(
                            `Your information could not be found, please go to onboarding
                                and fill out information to make a Managed Account
                            `
                       )
                   } 
                }
            }
        case actionStates.USER_PROFILE_SUCCESS_STATE:
            return {
                ...managedAccountState,
                businessName: action.payload['business_name'],
                state: {
                    ...managedAccountState.state,
                   businessInfo: {
                       ...managedAccountState.state.businessInfo,
                       isLoading: false,
                       success: true,
                       error: true
                   } 
                }
            }
            
        case actionStates.GOOGLE_LOADING_STATE:
            return {
                ...managedAccountState,
                state: {
                    ...managedAccountState.state,
                   google: {
                       ...managedAccountState.state.google,
                       isLoading: true
                   },
                   businessInfo: {
                    ...managedAccountState.state.businessInfo,
                    isLoading: false,
                    error: false,
                    success: false   
                  } 
                }
            }
        
        case actionStates.GOOGLE_SUCCESS_STATE:
            return {
                ...managedAccountState,
                state: {
                    ...managedAccountState.state,
                   google: {
                       ...managedAccountState.state.google,
                       isLoading: false,
                       success: true,
                       error: false
                   } 
                }
            }
        case actionStates.GOOGLE_ERROR_STATE:
            return  {
                ...managedAccountState,
                state: {
                    ...managedAccountState.state,
                   google: {
                       ...managedAccountState.state.google,
                       isLoading: false,
                       success: false,
                       error: true,
                       errorMessage: managedAccountState.state.google.errorMessage(
                           action.payload.data
                        )
                   } 
                }
            }
        case actionStates.FACEBOOK_LOADING_STATE:
            return {
                    ...managedAccountState,
                    state: {
                        ...managedAccountState.state,
                       facebook: {
                           ...managedAccountState.state.facebook,
                           isLoading: true
                       },
                       google: {
                        ...managedAccountState.state.google,
                        isLoading: false,
                        error: false,
                      } 
                    }
            }          
        
            case actionStates.FACEBOOK_SUCCESS_STATE:
                return {
                    ...managedAccountState,
                    state: {
                        ...managedAccountState.state,
                        facebook: {
                            ...managedAccountState.state.facebook,
                            isLoading: false,
                            success: true,
                            error: false
                        } 
                    }
                }
            case actionStates.FACEBOOK_ERROR_STATE:
                return {
                    ...managedAccountState,
                    state: {
                        ...managedAccountState.state,
                        facebook: {
                            ...managedAccountState.state.facebook,
                            isLoading: false,
                            success: false,
                            error: true,
                            errorMessage: managedAccountState.state.facebook.errorMessage(
                                action.payload.data
                            )
                        } 
                    }
                }
            case actionStates.IS_MANAGED_BUSINESSES_CREATED:
                debugger;
                return  {
                    ...managedAccountState,
                    isManagedAccountFormSubmitted: true
                }   
            default: 
                console.error(
                    'TYPE IS NOT LISTED in ACTIONTYPES! *managedStateReducer'
                )        

        }
}

  
const ManagedAccountComponent = ({ token }) => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [managedAccountState, dispatchManagedAccountState] = useReducer(
        managedStateReducer, initialStateForManagedReducer
    ) 
    const history = useHistory();
    const [modalStyle] = useState(getModalStyle);
    
    const createManagedAccount = async () => {
        const googleFormData = new FormData(),
              facebookFormData = new FormData();
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        }

        dispatchManagedAccountState({
            type: actionStates.USER_PROFILE_LOADING_STATE
        });

        const getUserAccountInformation = await axios.get(
            'http://localhost:8000/api/business-info/', config
        ).then(response => {
            if(!response?.data || !response?.data.length){
                dispatchManagedAccountState({
                    type: actionStates.USER_PROFILE_FAILURE_STATE
                })
                return;
            } else {
                googleFormData['business_name'] = response.data['business_name']
                facebookFormData['business_name'] = response.data['business_name']
                dispatchManagedAccountState({
                    type: actionStates.USER_PROFILE_SUCCESS_STATE,
                    payload: {
                        business_name: googleFormData['business_name']
                    }
                })
            }

        }).catch(err => {
            dispatchManagedAccountState({
                type: actionStates.USER_PROFILE_FAILURE_STATE,
                payload: {
                    data: err.data
                }
            })
        });

        // if(!Object.keys(googleFormData).length && !Object.keys(facebookFormData).length) return;
        dispatchManagedAccountState({
            type: actionStates.GOOGLE_LOADING_STATE
        })

        googleFormData.append('business_name', 'Johns Lemonade Stand');
        facebookFormData.append('business_name', 'Johns Lemonade Stand');

        const createGoogleBusinessAccount = await axios.post(
            'http://localhost:8000/api/managed-ga-accounts/', 
            googleFormData, config 
        ).then(response => {
            dispatchManagedAccountState({
                type: actionStates.GOOGLE_SUCCESS_STATE
            })
        }) .catch(err => {
            dispatchManagedAccountState({
                type: actionStates.GOOGLE_ERROR_STATE,
                payload: {
                    data: err.data
                }
            })
        })

        dispatchManagedAccountState({
            type: actionStates.FACEBOOK_LOADING_STATE
        });

        dispatchManagedAccountState({
            type: actionStates.FACEBOOK_SUCCESS_STATE
        });
        
        dispatchManagedAccountState({
            type: actionStates.IS_MANAGED_BUSINESSES_CREATED
        })

        // const createFacebookBusinessAccount = await axios.post(
        //     'http://localhost:8000/api/create-managed-facebook-ads-account/', 
        //     googleFormData, config 
        // ).then(response => {
        // }).catch(err => {
        
        // }) 
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
    }));

    const classes = useStyles();

    React.useEffect(() => {
        if(checked){
           createManagedAccount();     
        }
    }, [checked])

    React.useEffect(() => {
       if(managedAccountState.state.facebook.success){
           setTimeout(() => {
               history.push('/create/targeting')
           }, 2500)
       }
    }, [managedAccountState.state])
 
    return(
    <div>
        <div>
        <FormControlLabel
            control={
            <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="Managed Account"
                color="primary"
            />
            }
            label="Make Managed Account"
        />
        </div>
        <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
            What is a Managed Account?
        </Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"What is a Managed Account?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde rerum, 
                    consequuntur adipisci, laboriosam sit ullam saepe illum fugiat ea explicabo 
                    nostrum impedit earum vel eum veniam fugit omnis hic voluptate.
                </DialogContentText>    
                </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                Ok
                </Button>
            </DialogActions>
        </Dialog>
        {checked && (
            <ManagedAccountStatusComponent 
                facebookState={managedAccountState.state.facebook}
                googleState={managedAccountState.state.google}
                infoState={managedAccountState.state.businessInfo} 
            />
        )}
        {managedAccountState.isManagedAccountFormSubmitted && (
            <Modal
                open={managedAccountState.isManagedAccountFormSubmitted}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">
                You have created a Managed Account!
                </h2>
                <p id="simple-modal-description">
                Your Business Name is: <strong>{managedAccountState.businessName}</strong> 
                </p>
                <p id="simple-modal-description">
                    You will be redirected soon...
                </p>
              </div>
            </Modal>
        )}           
        

    </div>
    )
}

export { 
    ManagedAccountComponent,
    managedStateReducer,
    ManagedAccountStatusComponent,
    actionStates
};