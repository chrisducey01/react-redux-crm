import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ redirect, children, ...rest }) {
    const loggedIn = useSelector(state => state.loggedIn)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedIn === true) ? (
                    children
                ) : (
                        (loggedIn === false) ?
                            (
                                <Redirect
                                    to={{
                                        pathname: redirect ,
                                        state: { from: location }
                                    }}
                                />
                            )
                            :
                            (
                                <div><h1>Loading...</h1></div>
                            )
                    )
            }
        />
    );
}

export default PrivateRoute;