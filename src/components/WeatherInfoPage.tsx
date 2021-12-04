import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
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
    dispatch(fetchWeatherInfo({ city: 'Lagohs', unit: tempUnit }));
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

  const { city } = data;
  return (
    <>
      {loading === 'pending' ? (
        <LoadingScreen />
      ) : (
        <Flex
          flexDirection="column"
          height="100vh"
          mx="auto"
          p={['2rem', '4rem']}
          maxWidth="70rem"
        >
          <Box py="3rem">
            <Button onClick={refreshPage}>Refresh</Button>
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
          <Flex flexDirection="column" flex="1">
            <Heading
              as="h2"
              size="lg"
              color="white"
              fontWeight="700"
              fontSize={["30px", "40px"]}
              my="2rem"
              flex="1"
              display="grid"
              placeContent="center"
            >
              {`${city?.name}, ${city?.country}`}
            </Heading>
            <Flex flex="1" alignItems="center" minHeight="70%">
              <WeatherCarousel />
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default memo(WeatherInfoPage);
