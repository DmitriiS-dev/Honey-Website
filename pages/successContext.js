// successContext.js

import React, { createContext, useContext, useState } from 'react';

const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
  const [successData, setSuccessData] = useState(null);

  return (
    <SuccessContext.Provider value={{ successData, setSuccessData }}>
      {children}
    </SuccessContext.Provider>
  );
};

export const useSuccessContext = () => useContext(SuccessContext);
