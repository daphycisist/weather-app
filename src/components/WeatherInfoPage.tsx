import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherInfo } from '../redux/actions/fetchWeatherInfo';
import { RootState } from '../redux/store';

const WeatherInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherInfo('Lagosn'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading } = useSelector((state: RootState) => state.weather);
    console.log({loading})
  return <div></div>;
};

export default WeatherInfoPage;
