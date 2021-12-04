import { Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IWeatherAverage } from '../types';

const WeatherCard: React.FC<IWeatherAverage> = ({
  temp,
  humidity,
  icon,
  windSpeed,
  date,
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
      justifyContent="center"
      padding="5px"
      textAlign="center"
    >
      <Text>{date}</Text>
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
      <Heading as="h1" size="2xl">
        {temp}
        <small>&deg;{unit === 'metric' ? 'C' : 'F'}</small>
      </Heading>
    </Flex>
  );
};

export default WeatherCard;
