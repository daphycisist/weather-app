import axios, { AxiosError } from 'axios';
import { ILocation, TempUnits } from './../types/index';
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeatherData = async (
  unit: TempUnits,
  location: ILocation
) => {
  try {
    const { lat, lon } = location;
    const { data } = await axios.get(`
    ${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}
    `);
    // const { data } = await axios.get(`
    // ${baseUrl}?q=${city}&appid=${apiKey}&units=${unit}
    // `);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    throw e;
  }
};
