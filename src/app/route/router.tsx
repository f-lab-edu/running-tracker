import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '@app/layout/DefaultLayout'
import { lazy } from 'react'
const DailyPage = lazy(() => import('@pages/daily'))
const WeeklyPage = lazy(() => import('@pages/weekly'))
const CalenderPage = lazy(() => import('@pages/calender'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <DailyPage />,
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