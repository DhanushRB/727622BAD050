import axios from 'axios';

const TEST_SERVER_BASE_URL = 'http://20.244.56.144/evaluation-service';

const ENDPOINTS = {
  p: `${TEST_SERVER_BASE_URL}/primes`,
  f: `${TEST_SERVER_BASE_URL}/fibo`,
  e: `${TEST_SERVER_BASE_URL}/even`,
  r: `${TEST_SERVER_BASE_URL}/rand`
};

export const fetchNumbers = async (type) => {
  try {
    const url = ENDPOINTS[type];
    const response = await axios.get(url, { timeout: 500 });
    return response.data;
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return null;
  }
};
