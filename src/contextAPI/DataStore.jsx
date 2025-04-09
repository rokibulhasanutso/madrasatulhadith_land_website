import React, { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase/config";

// Create Context
const DataStoreContext = createContext();

// Provider component
export const DataStoreProvider = ({ children }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);

  // get all data
  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from("StudentResult").select("*");
    setStore(data);
    setLoading(false);
  };

  // reload all data
  const refresh = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataStoreContext.Provider value={{ store, setStore, loading, refresh }}>
      {children}
    </DataStoreContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useDataStore = () => {
  return useContext(DataStoreContext);
};
