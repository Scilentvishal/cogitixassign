"use client"
import React, { createContext, useState } from 'react'
export const ThemeContext = createContext();

const ContextProvider = ({children}) => {

    const [nav, setNav] = useState(false);

    const openNav = () => {
      setNav(true);
  }

  const closeNav = () => {
      setNav(false);
  }
  return (
    <ThemeContext.Provider value={{ openNav, closeNav, nav}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextProvider