import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
    user: {},
    loggedIn: false
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "SUCCESSFUL_LOGIN":
            return {...state, loggedIn: true};
        case "INVALID_LOGIN":
            return {...state, loggedIn: false};
        default: 
            return state;
    }
};

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
