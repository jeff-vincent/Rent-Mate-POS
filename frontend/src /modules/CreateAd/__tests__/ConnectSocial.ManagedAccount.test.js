import React from 'react';
import { shallow } from 'enzyme';
import { 
    ManagedAccounts,
    managedStateReducer,
    ManagedAccountStatusComponent,
    actionStates
} from '../components/ConnectSocial.ManagedAccount';

const title = 'Test Title';
let token = localStorage.getItem('token')

 describe('managedStateReducer should return proper state on correct action', () => {
    it('it should throw error on empty parameters', () => {
        expect(managedStateReducer({}, {})).ToThrow(Error);
    });
    it('it should change business_info state to isLoading to true', () => {
        expect(managedStateReducer({},{
            type: actionStates.USER_PROFILE_LOADING_STATE
        })).toBeDefined()
    })
 })

 