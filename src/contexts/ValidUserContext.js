import React, { createContext, useState } from 'react';

export const ValidUserContext = createContext();

const ValidUserProvider = ({ children }) => {
  const [isValidUser, setIsValidUser] = useState(false);

  const apiAuthCheck = async (email, password) => {
    // Your authentication logic here
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  };

  return (
    <ValidUserContext.Provider value={{ isValidUser, apiAuthCheck }}>
      {children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserProvider;
