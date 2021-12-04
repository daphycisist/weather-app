import { Grid } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const LoadingScreen: React.FC = () => {
  const { loading } = useSelector(({ weather }: RootState) => weather);
  return (
    <Grid
      position="relative"
      top="0"
      bottom="0"
      zIndex="20"
      width="100%"
      height="100vh"
      placeContent="center"
      backgroundColor="#9921e8"
      backgroundImage="linear-gradient(315deg, #9921e8 0%, #5f72be 74%)"
    >
      <Spinner
        color="white"
        size="xl"
        label="loading spinner"
        thickness="4px"
      />
    </Grid>
  );
};

export default LoadingScreen;
