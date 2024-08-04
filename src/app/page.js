"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Home/Card";
import { communication } from "@/constants/APICall/Comminication";
import Pagination from "@/components/Home/Pagination";

const Home = () => {
  const [characterData, setCharacterData] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const searchParams = useSearchParams();
  const episodeId = searchParams.get("episode");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        if (episodeId) {
          const episodeRes = await communication.getSingleEpisode(episodeId);
          const characterPromises = episodeRes.data.characters.map(characterId =>
            communication.getSingleCharacter(characterId)
          );
          const characterResponses = await Promise.all(characterPromises);
          setCharacterData(characterResponses.map(res => res.data));
        } else {
          const charactersRes = await communication.getCharacters(page);
          setCharacterData(charactersRes.data.results);
          setTotalPages(charactersRes.data.info.pages);
        }
        const episodesRes = await communication.getAllEpisodes();
        setEpisodes(episodesRes.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchData();
  }, [page, episodeId]);

  return (
    <div className="flex">
      <main className="flex-1">
        {loading ? (
          <p>Loading...</p> // Loading state
        ) : (
          <>
            <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 justify-center text-center grid-cols-2 sm:gap-3 gap-2 w-full">
              {/* sasas */}
              {characterData.length > 0 ? (
                characterData.map((data, i) => (
                 <Card data={data} key={i} />
                ))
              ) : (
                <p>No characters found.</p>
              )}
            </div>
            {!episodeId && (
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
