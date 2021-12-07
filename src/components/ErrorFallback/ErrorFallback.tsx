import { Button } from '@chakra-ui/button';
import { Grid, Text } from '@chakra-ui/layout';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface IError {
  error: Error | string;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<IError> = ({ error, resetErrorBoundary }) => {
  const { loading } = useSelector(({ weather }: RootState) => weather);
  return (
    <>
      <Grid
        role="alert"
        textAlign="center"
        placeContent="center"
        height="100vh"
        w="100%"
        background="#C3423F"
        padding={['2rem']}
      >
        <Text
          fontSize={['20px']}
          fontWeight={['black']}
          marginBottom={['1rem']}
          color="#d3fdfb"
        >
          Something went wrong
        </Text>
        <pre style={{ color: '#000000' }}>{error}</pre>
        <Button
          onClick={resetErrorBoundary}
          disabled={loading === 'pending'}
          marginTop={['.5rem']}
        >
          Try again
        </Button>
      </Grid>
    </>
  );
};
export default memo(ErrorFallback);
