import axios from 'axios';
import type { Character } from '../types/character';

export const api = axios.create({
  baseURL: '/api' 
});

interface ApiResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
}

export const getCharacters = async (page = 1, name = '', status = '', species = '') => {
  const response = await api.get<ApiResponse>('/character', {
    params: {
      page,
      ...(name && { name }),
      ...(status && { status }),
      ...(species && { species }),
    },
  });
  return response.data;
};