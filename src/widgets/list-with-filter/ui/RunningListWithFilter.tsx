import SearchForm from "@features/running-search/ui/SearchForm"
import RunningListSkeleton from "@features/running/ui/RunningListSkeleton"
import SuspenseRunningList from "@features/running/ui/SuspenseRunningList"
import AsyncBoundary from "@shared/ui/AsyncBoundary"
import { Running } from "@entities/running/constant/running"
import { useToggleRunningMutation } from "@features/running/model/useToggleRunningMutation"
import { useSearchParams } from "react-router-dom"
import { searchParamsToSearchFilter } from "@entities/searchOption/lib/searchParamAsSearchOption"
interface RunningListWithFilterProps {
  startTime: number,
  endTime: number,
  onItemClick: (running: Running) => void
}

const RunningListWithFilter = (props: RunningListWithFilterProps) => {
  const { onItemClick, startTime, endTime } = props
  const [searchParams] = useSearchParams()
  const searchOption = searchParamsToSearchFilter(searchParams)
  const { mutate: toggleAggregate } = useToggleRunningMutation()
  return <section className="flex flex-col gap-4">
    <SearchForm />
    <AsyncBoundary
      pendingFallback={<RunningListSkeleton />}
    >
      <SuspenseRunningList
        searchOption={{ ...searchOption, startTime, endTime }}
        onClick={onItemClick}
        onToggleAggregate={toggleAggregate}
      />
    </AsyncBoundary>
  </section>
}

export default RunningListWithFilter
