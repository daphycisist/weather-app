import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWeatherData, IWeatherState } from '../Interfaces';

const initialState: IWeatherState = {
  data: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeatherData: (state, action: PayloadAction<IWeatherData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;