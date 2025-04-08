import { HeroUIProvider } from "@heroui/react"
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Provider as JotaiProvider } from 'jotai'
import RunningModal from '../../featured/running-modal/ui/RunningModal'
import { router } from '../routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    },
  },
})

export default function App() {
  return <HeroUIProvider>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <RouterProvider router={router} />
          <RunningModal />
        </JotaiProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </HeroUIProvider>
}