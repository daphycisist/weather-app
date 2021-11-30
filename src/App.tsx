import { Box } from '@chakra-ui/layout';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
// import './App.css';
import ErrorFallback from './components/ErrorFallback';
import WeatherInfoPage from './components/WeatherInfoPage';
import { fetchWeatherInfo } from './redux/actions/fetchWeatherInfo';

function App() {
  const dispatch = useDispatch();
  const resetErrorBoundary = () => {
    dispatch(fetchWeatherInfo('Lagos'));
  };

  return (
    <Box className="App" padding="0">
      <ErrorBoundary
        onReset={() => {
          resetErrorBoundary();
        }}
        FallbackComponent={ErrorFallback}
      >
        <WeatherInfoPage />
      </ErrorBoundary>
    </Box>
  );
}

export default App;
