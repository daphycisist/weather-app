import { Grid } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <Grid
      position="relative"
      top="0"
      // bottom="0"
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
