import axios from 'axios';

export const fetchNewGame = async () => {
  const { data } = await axios.get('http://localhost:3333/api/word');
  return data;
};

export const fetchGameState = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3333/api/word/${id}`);
  return data;
};

export const guessCharacter = async (id: string, character: string) => {
  await axios.post(`http://localhost:3333/api/word/${id}/character`, { character });
  return fetchGameState(id);
};
