"use client";
import { useContext, useEffect, useState } from "react";
import style from "./SideNavigation.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { communication } from "../../constants/communication";
import { ThemeContext } from "../../constants/ContextApi";

const SideNavigation = () => {
  const [episodeData, setEpisodeData] = useState([]);
  const [page, setPage] = useState(1); // Initialize with 1

  const searchParams = useSearchParams();
  const episodeId = searchParams.get("episode");

  const getAllEpisodes = async () => {
    try {
      const res = await communication.getAllEpisodes(page);
      setEpisodeData(res.data.results); // Update to access the correct property if needed
    } catch (error) {
      console.log("Error fetching episodes:", error);
    }
  };

  useEffect(() => {
    getAllEpisodes();
  }, [page]);

  // Function to determine the active class
  const activeClass = (id) => {

    return id == episodeId ? "bg-white text-black" : "bg-black text-white";
  };

  const getQuery = (id) => {};

  const { openNav, closeNav, nav } = useContext(ThemeContext);

  return (
    <div
      className={`fixed top-0 md:left-0 ${
        nav ? "left-0" : "-left-96"
      } bottom-0 bg-black text-white z-50 md:px-4 px-2 md:py-5 py-3 lg:w-[300px] md:w-[270px] sm:w-1/2 w-100 overflow-y-auto transition-all ${
        style.sidenav
      }`}
    >
      <ul>
        <li className="md:hidden">
          <div className="p-4 flex justify-end cursor-pointer" onClick={closeNav}>
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </li>
        {episodeData.length > 0 &&
          episodeData.map((item) => (
            <li
              key={item.id}
              className={`capitalize px-4 py-2 mb-2 rounded-md border-2 ${activeClass(
                item.id
              )}`}
            >
              <Link
                href={{
                  pathname: "/",
                  query: {
                    episode: item.id == episodeId ? null : item.id, // Toggle episode ID
                  },
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SideNavigation;
