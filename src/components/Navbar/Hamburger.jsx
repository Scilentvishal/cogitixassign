"use client"

import { useContext } from "react";
import { ThemeContext } from "../../constants/ContextApi";

const Hamburger = () => {
    const { openNav, closeNav, nav } = useContext(ThemeContext);

  return (
    <div className="HAMBURGER-ICON md:hidden cursor-pointer space-y-2" onClick={nav ? closeNav : openNav}>
      <span className="block h-0.5 w-6 animate-pulse bg-gray-600"></span>
      <span className="block h-0.5 w-4 animate-pulse bg-gray-600"></span>
      <span className="block h-0.5 w-6 animate-pulse bg-gray-600"></span>
    </div>
  );
};

export default Hamburger;
