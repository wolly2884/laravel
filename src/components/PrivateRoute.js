import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom'; // Importe Navigate
import { authContext } from '../contexts/AuthContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(authContext);
    const { loading } = auth;
  
    if (loading) {
      return (
        <Route
          {...rest}
          render={() => {
            return <p>Loading...</p>;
          }}
        />
      );
    }
  
    return (
      <Route
        {...rest}
        render={routeProps => {
          return auth.data ? (
            <Component {...routeProps} />
          ) : (
            <Navigate to="/sign-in" /> // Use Navigate para redirecionar
          );
        }}
      />
    );
};

export default PrivateRoute;
