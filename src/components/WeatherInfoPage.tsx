import { Button } from '@chakra-ui/button';
import { Box, Container, Grid } from '@chakra-ui/layout';
// import AlgoliaPlaces from 'algolia-places-react';
import React, { memo, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherInfo } from '../redux/actions/fetchWeatherInfo';
import { RootState } from '../redux/store';

const WeatherInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ weather }: RootState) => weather);
  const [refreshing, setRefreshing] = useState(false);

  const handleError = useErrorHandler();

  useEffect(() => {
    dispatch(fetchWeatherInfo('Lagnos'));
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  if (error) handleError(error);

  const refreshPage = () => setRefreshing((prev) => !prev);

  console.log({ loading });
  return (
    <>
      <Container height="100vh" background="#060D26">
        {loading === 'pending' ? (
          <Grid height="100%" placeContent="center">
            Loading
          </Grid>
        ) : (
          <Box py="3rem">
            <Button onClick={refreshPage}>Refresh</Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default memo(WeatherInfoPage);
