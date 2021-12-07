import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Radio, RadioGroup, useToast } from '@chakra-ui/react';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import WeatherCarousel from '../components/WeatherCarousel/WeatherCarousel';
import { setCoordinates, setTemperatureUnit } from '../features/weather';
import { fetchWeatherInfo } from '../redux/actions/fetchWeatherInfo';
import { RootState } from '../redux/store';
import { TempUnits } from '../types';

const WeatherInfoPage: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { Celsius, Fahrenheit } = TempUnits;
  const { error, data, location } = useSelector(
    ({ weather }: RootState) => weather
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = React.useState<TempUnits>(Celsius);

  const handleError = useErrorHandler();

  useEffect(() => {
    if ('geolocation' in navigator) {
      
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        );
      });
    } 
  }, []);

  

  useEffect(() => {
    
    if (JSON.stringify(location) !== JSON.stringify({})) {

      dispatch(
        fetchWeatherInfo({
          unit: tempUnit,
          coordinates: location,
        })
      );
      setRefreshing(false);
      handleTempUnit(tempUnit);
    } 
  }, [location, tempUnit, refreshing]);

  const handleTempUnit = (value: TempUnits) => {
    setTempUnit(value);
    dispatch(setTemperatureUnit(tempUnit));
  };

  

  if (error) handleError(error);
  const refreshPage = () => setRefreshing((prev) => !prev);

  const { city } = data;
  return (
    <>
      <Flex
        flexDir="column"
        height="100vh"
        mx="auto"
        p={['2rem', '4rem']}
        maxWidth="70rem"
      >
        <Box py="3rem">
          <Button data-testid="refresh" onClick={refreshPage}>Refresh</Button>
        </Box>
        <RadioGroup
          onChange={(e: TempUnits) => handleTempUnit(e)}
          value={tempUnit}
          color="white"
        >
          <Stack direction="row" justifyContent="space-between">
            <Radio colorScheme="white" value={Celsius}>
              <Text fontSize={['sm', 'xl']}>Celsius</Text>
            </Radio>
            <Radio colorScheme="white" value={Fahrenheit}>
              <Text fontSize={['sm', 'xl']}>Fahrenheit</Text>
            </Radio>
          </Stack>
        </RadioGroup>
        <Flex flexDir="column" flex="1" pt={['5px', '2rem']}>
          <Flex
            flex="1"
            textAlign="center"
            justifyContent="center"
            flexDir="column"
            gap={['5px', '3rem']}
          >
            <Heading
              as="h2"
              size="lg"
              color="white"
              fontWeight="700"
              fontSize={['28px', '40px']}
            >
              {`${city?.name}, ${city?.country}`}
            </Heading>
            <Text color="white" fontWeight="700" fontSize={['14px', '20px']} data-testid="todays-date">
              {moment().format('dddd, MMMM DD, YYYY')}
            </Text>
          </Flex>
          <Flex flex="1" alignItems="center" minHeight="70%">
            <WeatherCarousel />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default memo(WeatherInfoPage);
