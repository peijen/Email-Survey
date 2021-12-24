import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => 
    // redux thunk
    /* 
    whenever action creator gets called, return a function
    pass in dispatch function to this function so we do not 
    need to immediately return the action
    */
    async function(dispatch) {
        //call server api to check if user is logged in
        // dispatch action will get sent to reducers
        const res = await axios.get('/api/current_user')
        //// res.data only returns relevant data from request
        dispatch(
            {
                type: FETCH_USER, 
                payload: res.data
            }
        )
    };


export const handleStripeToken = (token) =>
    async function(dispatch) {
        const res = await axios.post('/api/stripe', token);
        // dispatch to update user model inside the authReducer
        dispatch(
            {
                type: FETCH_USER, 
                payload: res.data
            }
        );
    };