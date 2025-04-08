import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const DataStoreContext = createContext();

// Provider component
export const DataStoreProvider = ({ children }) => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch(
      "https://sheetdb.io/api/v1/u6lmff50t5onh"
    )
      .then((response) => response.json())
      .then((data) => setStore(data));
  }, []);

  return (
    <DataStoreContext.Provider value={{ store, setStore }}>
      {children}
    </DataStoreContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useDataStore = () => {
  return useContext(DataStoreContext);
};
