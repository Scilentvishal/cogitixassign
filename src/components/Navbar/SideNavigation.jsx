"use client";
import { communication } from "@/constants/APICall/Comminication";
import { useEffect, useState } from "react";
import style from "./SideNavigation.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
    console.log(id, episodeId);
    
    return id == episodeId ? "bg-white text-black" : "bg-black text-white";
  };

  const getQuery = (id) =>{

  }

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 bg-black text-white md:px-4 px-2 md:py-5 py-3 lg:w-[300px] md:w-[270px] w-[220px] overflow-y-auto ${style.sidenav}`}
    >
      <ul>
        {episodeData.length > 0 &&
          episodeData.map((item) => (
            <li
              key={item.id}
              className={`capitalize px-4 py-2 mb-2 rounded-md border-2 ${activeClass(item.id)}`}
            >
              <Link
                href={{
                  pathname: "/",
                  query: {
                    episode: item.id == episodeId ? null : item.id // Toggle episode ID
                  }
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
