import { ChakraProps } from '@chakra-ui/system';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IWeatherAverage } from '../../types';
import { convertMetersPerSecToMPH, GroupDataByDate } from '../../utils';
import NavArrows from '../NavArrows/NavArrows';
import WeatherCard from '../WeatherCard/WeatherCard';

const WeatherCarousel: React.FC<ChakraProps> = () => {
  const { data } = useSelector((state: RootState) => state.weather);
  const list = data?.list ?? [];

  const groupedData = GroupDataByDate(list);
  const weatherDates = Object.keys(groupedData);
  const aggregateArray = weatherDates.map((item, index) => {
    const dataArr = groupedData[item];
    const dataLength = dataArr.length;
    let data = {} as IWeatherAverage;
    const sum = groupedData[item].reduce(
        (acc, curr) => {
        acc.temp += Math.round(curr?.main.temp / dataLength);
        acc.humidity += Math.round(curr?.main.humidity / dataLength);
        acc.windSpeed += Math.round(convertMetersPerSecToMPH(curr?.wind.speed / dataLength));
        return acc;
      },
      { temp: 0, humidity: 0, icon: '', windSpeed: 0 }
    );
      

    data = {
      date: item,
      ...sum,
      icon: dataArr[0].weather[0].icon,
      description: dataArr[0].weather[0].description,
      report: dataArr,
    };
    return data;
  });

  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 450, itemsToShow: 2, itemsToScroll: 2, pagination: true },
    { width: 768, itemsToShow: 3 },
  ];
  return (
    <Carousel
      breakPoints={breakPoints}
      isRTL={false}
      renderArrow={NavArrows}
      itemPadding={[0, 10,]}
    >
      {aggregateArray?.map((item) => (
        <WeatherCard {...item} key={item.date} />
      ))}
    </Carousel>
  );
};

export default WeatherCarousel;
