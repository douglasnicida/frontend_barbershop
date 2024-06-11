import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './routes';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// ensures styles are prepended to the <head>, instead of appended
const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CacheProvider value={emotionCache}>
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  </CacheProvider>
);