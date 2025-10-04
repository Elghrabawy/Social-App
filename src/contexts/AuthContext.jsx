import { createContext, useEffect, useState } from "react";
import React from 'react'
import { getLoggedUserDataApi } from "../services/UserService";
import { addToast } from "@heroui/react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
  const [userData, setUserData] = useState(null);

  const getLoggedUserData = async () => {
    try {
      const response = await getLoggedUserDataApi();
      // if(response && response.data && response.data.user)
      setUserData(response.data.user);
    } catch (error) {
      if (error.status == 401) {
        addToast({
          title: "something went wrong",
          description: "Unotharized user start login again",
          color: "danger",
          variant: "bordered",
          timeout: 3000
        });
        setIsLoggedIn(false);
        localStorage.removeItem("token")
      } else {
        addToast({
          title: "something went wrong",
          description: "Cannot fetch user data. Please try again later.",
          color: "warning",
          variant: "bordered",
          timeout: 3000
        });
      }
    }
  }
  
  useEffect(() => {
    if(isLoggedIn) {
      getLoggedUserData();
    }
  }, [isLoggedIn])

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData }}>
      {children}
    </authContext.Provider>
  )
}
