import moment from 'moment';
import { singleWeatherData } from '../types';

export const GroupDataByDate = (list: singleWeatherData[]) => {
  return list.reduce(
    (acc: Record<string, singleWeatherData[]>, curr: singleWeatherData) => {
      const date = formatDate(curr.dt_txt);
      acc[date] ? acc[date].push(curr) : (acc[date] = [curr]);
      return acc;
    },
    {}
  );
};

export const formatDate = (date: string) => {
  return moment(date).format('MMMM DD, YYYY');
};
