import React from 'react';
import ValidUserProvider from './contexts/ValidUserContext'
import AuthProvider from './contexts/AuthContext';
import SignIn from './screens/SignIn';
// Other imports...

const App = () => {
  return (
    <AuthProvider>
      <SignIn />
      {/* Other components */}
    </AuthProvider>
  );
};

export default App;
