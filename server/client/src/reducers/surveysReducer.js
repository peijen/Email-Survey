import { FETCH_SURVEYS } from "../actions/types";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_SURVEYS:
            // return payload with survey info
            return action.payload;
        default:
            return state;
    }
};