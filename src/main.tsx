import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <Provider store={store}>




      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router}>

        </RouterProvider>

        <Toaster richColors position="top-right" />
      </QueryClientProvider>




    </Provider>



  </StrictMode>,
)
