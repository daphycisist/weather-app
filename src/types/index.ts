export interface IWeatherData {
  city: ICityData;
  cod: string;
  cnt: number;
  message: number;
  list: singleWeatherData[];
}
export interface ICityData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export enum TempUnits {
  Fahrenheit = 'imperial',
  Celsius = 'metric',
}

export interface IWeatherTemp {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface singleWeatherData {
  main: IWeatherTemp;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  dt_txt: string;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
}

export interface ILocation {
  lat: number,
  lon: number,
}

export interface IQueryPayload {
  unit: TempUnits;
  coordinates: ILocation
}

export interface IWeatherData {
  city: ICityData;
  list: singleWeatherData[];
}

export interface IWeather {
  data: IWeatherData;
  loading: 'pending' | 'succeeded' | 'failed';
  error: string;
  unit: TempUnits;
  location: ILocation
}

export interface IWeatherAverage {
  date: string;
  icon: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  report: singleWeatherData[];
}
