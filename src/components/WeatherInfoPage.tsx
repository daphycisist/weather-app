import { Button } from '@chakra-ui/button';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnit } from '../features/weather';
import { fetchWeatherInfo } from '../redux/actions/fetchWeatherInfo';
import { RootState } from '../redux/store';
import { TempUnits } from '../types';
import LoadingScreen from './LoadingScreen';
import WeatherCarousel from './WeatherCarousel';

const WeatherInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const { Celsius, Fahrenheit } = TempUnits;
  const { loading, error, data, unit } = useSelector(
    ({ weather }: RootState) => weather
  );
  const [refreshing, setRefreshing] = useState(false);
  const [tempUnit, setTempUnit] = React.useState<TempUnits>(Celsius);

  const handleError = useErrorHandler();

  useEffect(() => {
    dispatch(fetchWeatherInfo({ city: 'Lagos', unit: tempUnit }));
    setRefreshing(false);
    handleTempUnit(tempUnit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, tempUnit]);

  const handleTempUnit = (value: TempUnits) => {
    setTempUnit(value);
    dispatch(setTemperatureUnit(tempUnit));
  };

  if (error) handleError(error);
  const refreshPage = () => setRefreshing((prev) => !prev);
  console.log(unit);

  const { city } = data;
  return (
    <>
      {loading === 'pending' ? (
        <LoadingScreen />
      ) : (
        <Box height="100vh" backgroundColor="#060D26" p={['2rem']}>
          <Box py="3rem">
            <Button onClick={refreshPage}>Refresh</Button>
          </Box>
          <RadioGroup
            onChange={(e: TempUnits) => handleTempUnit(e)}
            value={tempUnit}
            color="white"
          >
            <Stack direction="row" justifyContent="space-between">
              <Radio colorScheme="white" value={Celsius} fontSize="sm">
                Celsius
              </Radio>
              <Radio colorScheme="white" value={Fahrenheit}>
                Fahrenheit
              </Radio>
            </Stack>
          </RadioGroup>
          <Heading
            as="h2"
            size="lg"
            color="white"
            fontWeight="700"
            fontSize="30px"
            textAlign="center"
            my="2rem"
          >
            {`${city?.name}, ${city?.country}`}
          </Heading>
          <WeatherCarousel />
        </Box>
      )}
    </>
  );
};

export default memo(WeatherInfoPage);
