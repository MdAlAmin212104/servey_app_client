import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './Route/Route.jsx';
import Provider from './AuthProvider/Provider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterRole } from './Components/FilterRole/FilterRole.jsx';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <FilterRole>
          <RouterProvider router={router} />
        </FilterRole>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
