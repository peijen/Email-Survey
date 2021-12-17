import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    // redux thunk
    /* 
    whenever action creator gets called, return a function
    pass in dispatch function to this function so we do not 
    need to immediately return the action
    */
    return async function(dispatch) {
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
};

