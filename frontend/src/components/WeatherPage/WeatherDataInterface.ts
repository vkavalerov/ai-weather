// A separate interface for the formatted weather data
export interface FormattedWeatherData {
  date: string;
  location: string;
  temperature: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}
