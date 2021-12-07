import { render, screen } from '@testing-library/react';
import moment from 'moment';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';
import WeatherInfoPage from '../pages/WeatherInfoPage';
import { store } from '../redux/store';
import { mockResponse } from '../utils/mock';

const server = setupServer(
  rest.get('/api', (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render the WeatherInfoPage component correctly', async () => {
  render(
    <Provider store={store}>
      <WeatherInfoPage />
    </Provider>
  );
  const radioButton = screen.getByText(/Fahrenheit/i);
  const dateText = screen.getByTestId('todays-date');
  const today = moment().format('dddd, MMMM DD, YYYY');

  expect(radioButton).toBeInTheDocument();
  expect(dateText).toHaveTextContent(today);
});

// test('should trigger page refresh when Refresh button is clicked', async () => {
//   const onClick = jest.fn();

//   render(
//     <Provider store={store}>
//       <WeatherInfoPage />
//     </Provider>
//   );

//   const refreshButton = screen.getByTestId('refresh');
//   refreshButton.click = onClick;
//   fireEvent.click(refreshButton);
//   expect(refreshButton).toBeInTheDocument();
//   expect(onClick).toHaveBeenCalledTimes(1);
// });
