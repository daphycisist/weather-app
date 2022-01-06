import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IWeatherAverage } from '../../types';

const WeatherCard: React.FC<
  IWeatherAverage & { id?: string; onClick?: (e: any) => void }
> = ({
  temp,
  humidity,
  icon,
  windSpeed,
  description,
  date,
  report,
  id,
  onClick,
}) => {
  const { unit } = useSelector(({ weather }: RootState) => weather);

  return (
    <Flex
      flexDirection="column"
      height={['12rem', '18rem']}
      width="100%"
      backgroundColor="#6f9ceb"
      borderRadius="10px"
      alignItems="center"
      justifyContent="space-around"
      padding={['5px', '1rem']}
      textAlign="center"
      _hover={{ cursor: 'pointer' }}
      onClick={onClick}
      id={id}
      paddingBottom={["12rem"]}
    >
      <Text fontWeight="bold" color="#344055" fontSize={['16px', '20px']}>
        {date}
      </Text>
      <Stack>
        <Flex
          width="4rem"
          height="4rem"
          justifyContent="center"
          alignItems="center"
          margin="0 auto"
        >
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt=""
            width="100%"
            height="100%"
          />
        </Flex>
        <Text>{description}</Text>
      </Stack>
      <Heading fontSize={['30px']}>
        {temp}
        <small>&deg;{unit === 'metric' ? 'C' : 'F'}</small>
      </Heading>
      <Flex
        justifyContent="space-between"
        // width="100%"
        width="80%"
        display={['none', 'flex']}
      >
        <Box>
          <Text fontWeight="600" color="#344055">
            Wind Speed
          </Text>
          <Text>{windSpeed} mph</Text>
        </Box>
        <Box>
          <Text fontWeight="600" color="#344055">
            Humidity
          </Text>

          <Text>{humidity}%</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default WeatherCard;
