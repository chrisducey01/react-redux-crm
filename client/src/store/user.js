// Redux for user feature of the state tree
// This is the user account accessing the CRM

const initialState = {
    loggedIn: null
};


// Action type constants
const USER_LOGIN = "user/login";
const USER_LOGOUT = "user/logout";


// Action creators

// Update user information when they 
// have authenticated to an account
export const userLogin = (user) => {
    return {
        type: USER_LOGIN,
        payload: {
            loggedIn: true,
            user: user
        }
    };
};

// Clear out user information when they
// have logged out of their account
export const userLogout = () => {
    return {
        type: USER_LOGOUT,
        payload: {}
    }
};


// Reducer
export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return ({
                ...state,
                loggedIn: action.payload.loggedIn,
                ...action.payload.user
            })
        case USER_LOGOUT:
            return {
                loggedIn: false
            }
        default:
            return state;
    }
};