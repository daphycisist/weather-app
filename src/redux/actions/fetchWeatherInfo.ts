import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { fetchWeatherData } from '../../api/api';
import { IQueryPayload } from './../../types/index';

export const fetchWeatherInfo = createAsyncThunk(
  'fetchWeatherData',
  async (
    { city, unit }: IQueryPayload,
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchWeatherData(city, unit);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);
