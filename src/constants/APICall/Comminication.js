// src/constants/APICall/Communication.js

import axios from 'axios';

export function getServerUrl() {
  return 'https://rickandmortyapi.com/api';
}

export const communication = {
  getCharacters: async function (page) {
    try {
      const res = await axios.get(`${getServerUrl()}/character?page=${page}`);
      return res;
    } catch (error) {
      throw new Error(`Failed to fetch characters: ${error.message}`);
    }
  },
  getSingleCharacter: async function (url) {
    try {
      const res = await axios.get(url);
      return res;
    } catch (error) {
      throw new Error(`Failed to fetch characters: ${error.message}`);
    }
  },
  getAllEpisodes: async function () {
    try {
      const res = await axios.get(`${getServerUrl()}/episode`);
      return res;
    } catch (error) {
      throw new Error(`Failed to fetch episodes: ${error.message}`);
    }
  },
  getSingleEpisode: async function (id) {
    try {
      const res = await axios.get(`${getServerUrl()}/episode/${id}`);
      return res;
    } catch (error) {
      throw new Error(`Failed to fetch episode: ${error.message}`);
    }
  },
};
