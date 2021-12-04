import { ChakraProps } from '@chakra-ui/system';
import { groupCollapsed } from 'console';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IWeatherAverage } from '../types';
import { GroupDataByDate } from '../utils';
import NavArrows from './NavArrows';
import WeatherCard from './WeatherCard';

const WeatherCarousel: React.FC<ChakraProps> = () => {
  const { data } = useSelector((state: RootState) => state.weather);
  const { list } = data;

  const groupedData = GroupDataByDate(list);
  const weatherDates = Object.keys(groupedData);
  const aggregateArray = weatherDates.map((item, index) => {
      const dataArr = groupedData[item];
    const dataLength = dataArr.length;
    console.log({dataArr: dataArr});
    let data = {} as IWeatherAverage;
    const sum = groupedData[item].reduce(
      (acc, curr, dataArr) => {
        acc.icon = curr.weather[0].icon;
        acc.temp += Math.round(curr.main.temp / dataLength);
        acc.humidity += Math.round(curr.main.humidity / dataLength);
        acc.windSpeed += Math.round(curr.wind.speed / dataLength);
        return acc;
      },
      { temp: 0, humidity: 0, icon: '', windSpeed: 0 }
    );
      
    data = { date: item, ...sum };
    return data;
  });

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
  ];
  console.log({ groupedData });

  return (
    <Carousel
      breakPoints={breakPoints}
      isRTL={false}
      renderArrow={NavArrows}
      itemPadding={[0, 2]}
    >
      {aggregateArray.map((item) => (
        <WeatherCard {...item} key={item.date} />
      ))}
    </Carousel>
  );
};

export default WeatherCarousel;
