import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '@app/layout/DefaultLayout'
import { lazy } from 'react'
const IndexPage = lazy(() => import('@pages/index'))
const WeeklyPage = lazy(() => import('@pages/weekly'))
const CalenderPage = lazy(() => import('@pages/calender'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'weekly',
        element: <WeeklyPage />,
      },
      {
        path: 'calender',
        element: <CalenderPage />,
      },
    ],
  },
]) 