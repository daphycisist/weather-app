import { Button } from '@chakra-ui/button';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/react';
// import AlgoliaPlaces from 'algolia-places-react';
import React, { memo, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherInfo } from '../redux/actions/fetchWeatherInfo';
import { RootState } from '../redux/store';
import { TempUnits } from '../types';
import LoadingScreen from './LoadingScreen';

const WeatherInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const { Celsius, Fahrenheit } = TempUnits;
  const { loading, error, data } = useSelector(
    ({ weather }: RootState) => weather
  );
  const [refreshing, setRefreshing] = useState(false);
  const [tempUnit, setTempUnit] = React.useState<string>(Celsius);

  const handleError = useErrorHandler();

  useEffect(() => {
    dispatch(fetchWeatherInfo('Lagos'));
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  if (error) handleError(error);
  const refreshPage = () => setRefreshing((prev) => !prev);
  console.log(data);
  // const { city } = data[0];
  return (
    <>
      {loading === 'pending' ? (
        <LoadingScreen />
      ) : (
        <Box
          height="100vh"
          backgroundColor="#060D26"
          // backgroundImage="linear-gradient(315deg, #485461 0%, #28313b 74%)"

          p={['2rem']}
        >
          <Box py="3rem">
            <Button onClick={refreshPage}>Refresh</Button>
          </Box>
          <RadioGroup onChange={setTempUnit} value={tempUnit} color="white">
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
          >
            
          </Heading>
        </Box>
      )}
    </>
  );
};

export default memo(WeatherInfoPage);
