import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            // return payload info if user is logged in, else return false
            return action.payload || false;
        default:
            return state;
    }
};