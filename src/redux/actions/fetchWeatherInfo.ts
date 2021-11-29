import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { fetchWeatherData } from '../../api/api';

export const fetchWeatherInfo = createAsyncThunk(
  'fetchWeatherData',
  async (payload: string, { rejectWithValue, getState, dispatch }) => {
    try {
      return await fetchWeatherData(payload);
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);
