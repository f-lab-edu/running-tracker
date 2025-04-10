import { HeroUIProvider } from "@heroui/react"
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Provider as JotaiProvider } from 'jotai'
import { router } from '@app/routes'

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
        </JotaiProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </HeroUIProvider>
}