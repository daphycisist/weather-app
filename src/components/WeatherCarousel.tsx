import React from 'react';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { GroupDataByDate } from '../utils';

const WeatherCarousel = () => {
  const { data } = useSelector((state: RootState) => state.weather);
  const { list } = data;
    const res = GroupDataByDate(list);
    console.log(res)

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    // { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    // { width: 1200, itemsToShow: 4 },
  ];
  const items: any[] = [1,2,3,4];

  return (
    <Carousel breakPoints={breakPoints} isRTL>
      {items.map((item) => (
        // <Item key={item}>{item}</Item>
          <div >jo</div>
      ))}
    </Carousel>
  );
};

export default WeatherCarousel;
