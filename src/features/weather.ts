import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWeatherState } from '../Interfaces';
import { fetchWeatherInfo } from './../redux/actions/fetchWeatherInfo';

const initialState: IWeatherState = {
  data: [],
  loading: 'idle',
  error: '',
};

export const weatherSlice = createSlice({
  name: 'fetchWeatherData',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherInfo.pending, (state, action) => {
      state.loading = 'pending';
    });

    builder.addCase(
      fetchWeatherInfo.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = 'succeeded';
        state.data = action?.payload?.data;
      }
    );

    builder.addCase(
      fetchWeatherInfo.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'failed';
        state.data = [];
        state.error = action?.payload;
      }
    );
  },
});

// export const {  } = weatherSlice.actions;

export default weatherSlice.reducer;
