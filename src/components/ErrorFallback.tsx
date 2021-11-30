import { Button } from '@chakra-ui/button';
import { Box, Grid } from '@chakra-ui/layout';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface IError {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<IError> = ({ error, resetErrorBoundary }) => {
  const { loading } = useSelector(({ weather }: RootState) => weather);
  console.log(error);
  return (
    <Grid
      role="alert"
      textAlign="center"
      placeContent="center"
      h="100%"
      w="100%"
    >
      <Box display="flex" flexDirection="column" gap="1rem">
        <p>Something went wrong:</p>
        <pre>{error}</pre>
        <Button
          border="1px solid red"
          onClick={resetErrorBoundary}
          disabled={loading === 'pending'}
        >
          Try again
        </Button>
      </Box>
    </Grid>
  );
};
export default memo(ErrorFallback);
