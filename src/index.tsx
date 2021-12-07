// import {store}
import { ChakraProvider } from '@chakra-ui/react';
// import '@fontsource/raleway/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import theme from './Theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
