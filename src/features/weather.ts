import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWeatherData, TempUnits } from '../types';
import { fetchWeatherInfo } from './../redux/actions/fetchWeatherInfo';
import { IWeather } from './../types/index';

const initialState = {
  data: {},
  unit: TempUnits.Celsius,
  loading: 'pending',
  error: '',
  location: {},
} as IWeather;

export const weatherSlice = createSlice({
  name: 'Weather',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.unit = action.payload;
    },
    setCoordinates: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherInfo.pending, (state) => {
      state.loading = 'pending';
      state.error = '';
    });

    builder.addCase(
      fetchWeatherInfo.fulfilled,
      (state, action: PayloadAction<IWeatherData>) => {
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

export const { setTemperatureUnit, setCoordinates } = weatherSlice.actions;
export default weatherSlice.reducer;
