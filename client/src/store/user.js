// Redux for User feature of the state tree

const initialState = {
    user: {},
    loggedIn: null
};


// Action type constants
const USER_LOGIN = "user/login"; 


// Action creators
export const updateUserLogin = (loggedIn, user) => {
    return {
        type: USER_LOGIN,
        payload: {
            loggedIn,
            user
        }
    };
};


// Reducers
export default function userReducer(state = initialState, action){
    switch(action.type){
        case USER_LOGIN:
            return {...state, 
                loggedIn: action.payload.loggedIn,
                user: action.payload.user
            }
        default: 
            return state;
    }
}