import { HeroUIProvider } from "@heroui/react"
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Provider as JotaiProvider } from 'jotai'
import RunningModal from '@features/running-modal/ui/RunningModal'
import RunningForm from '@features/running-form/ui/RunningForm'
import { router } from '@app/routes'
import { useRunningForm } from "@entities/running/hooks/useRunningForm"
import useToggleRunningAggregateMutation from "@features/running-list/api/useToggleRunningAggregateMutation"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    },
  },
})

export default function App() {
  const { openForm } = useRunningForm()
  const { mutate: toggleAggregate } = useToggleRunningAggregateMutation()
  return <HeroUIProvider>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <RouterProvider router={router} />
          <RunningModal onModifyOpen={openForm} onToggleAggregate={toggleAggregate} />
          <RunningForm />
        </JotaiProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </HeroUIProvider>
}