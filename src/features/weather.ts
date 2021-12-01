import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWeather, IWeatherData } from '../types';
import { fetchWeatherInfo } from './../redux/actions/fetchWeatherInfo';
import { TempUnits } from './../types/index';

const initialState = {
  data: {},
  unit: TempUnits.Celsius,
  loading: 'pending',
  error: '',
} as IWeather;

export const weatherSlice = createSlice({
  name: 'Weather',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.unit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherInfo.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(
      fetchWeatherInfo.fulfilled,
      (state, action: PayloadAction<IWeatherData>) => {
        console.log('Payload', action.payload);
        state.loading = 'succeeded';
        state.data = action?.payload;
      }
    );

    builder.addCase(
      fetchWeatherInfo.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'failed';
        state.data = initialState.data;
        state.error = action?.payload;
      }
    );
  },
});

export const { setTemperatureUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
