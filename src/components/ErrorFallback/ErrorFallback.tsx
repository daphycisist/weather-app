import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        w="100%"
        background="#C3423F"
        textAlign="center"
        placeContent="center"
        // height="100vh"
        width="100%"
      >
        <Text
          fontSize={['20px']}
          fontWeight={['black']}
          marginBottom={['2rem']}
          color="#d3fdfb"
        >
          Something went wrong
        </Text>
        <Text
          color="#1d1d1d"
          wordBreak="break-all"
          fontWeight="medium"
          marginBottom={['1rem']}
          width="80%"
        >
          {error}
        </Text>
        <Button
          onClick={resetErrorBoundary}
          disabled={loading === 'pending'}
          // marginTop={['.5rem']}
          // maxW="30rem"
          // width="100%"
          marginX="auto"
        >
          Try again
        </Button>
      </Box>
    </>
  );
};
export default memo(ErrorFallback);
