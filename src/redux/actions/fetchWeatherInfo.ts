import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { fetchWeatherData } from '../../api/api';
import { IQueryPayload } from './../../types/index';

export const fetchWeatherInfo = createAsyncThunk(
  'fetchWeatherData',
  async (
    {  unit, coordinates }: IQueryPayload,
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchWeatherData( unit, coordinates);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);
