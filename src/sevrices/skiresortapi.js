import axios from 'axios';

// with the concept of using json-server library which acts as a local database

const skiResortUrl = 'http://localhost:8080/skiresorts'

export const getSkiResortList = async (id) => {
  id = id || '';
  try {
      return await axios.get(`${skiResortUrl}/${id}`);
  } catch (error) {
      console.log('Error while calling getSkiResort api ', error);
  }
}

export const addResort = async (skiresort) => {
  return await axios.post(`${skiResortUrl}`, skiresort);
}

export const deleteResortData = async (id) => {
  return await axios.delete(`${skiResortUrl}/${id}`);
}

export const editSkiResortData = async (id, skiresort) => {
  return await axios.put(`${skiResortUrl}/${id}`, skiresort)
}
