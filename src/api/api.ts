import axios, { AxiosError } from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

console.log({ baseUrl, apiKey });

export const fetchWeatherData = async (city: string) => {
  try {
    const { data } = await axios.get(`
    ${baseUrl}?q=${city}&appid=${apiKey}
    `);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    throw e;
  }
};
