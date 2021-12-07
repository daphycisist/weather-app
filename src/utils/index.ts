import moment from 'moment';
import { ILocation, singleWeatherData } from '../types';

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

export const convertMetersPerSecToMPH = (mps: number): number => {
  const mph = +(2.23694 * mps).toFixed(2);
  return mph;
};

export const getUsersLocation = async () => {
  let locationObj = {} as ILocation;
  navigator.geolocation.getCurrentPosition((position) => {
    locationObj.lat = position.coords.latitude;
    locationObj.lon = position.coords.longitude;
    return locationObj;
  });
  return locationObj;
};
