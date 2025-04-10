import { useGetRunningListQuery } from "@features/running/model/useGetRunningListQuery"
import { RunningCard, RunningCardProps } from "@entities/running/ui/RunningCard"
import { ItemList } from "@shared/ui/ItemList"
import { SearchOption } from "@entities/searchOption/constant/searchOption"
import { Running } from "@entities/running/constant/running"

interface SuspenseRunningListProps extends Omit<RunningCardProps, 'running'> {
  searchOption: SearchOption
}

const SuspenseRunningList: React.FC<SuspenseRunningListProps> = (props) => {
  const { searchOption, ...rest } = props
  const { data: runningList } = useGetRunningListQuery(searchOption)
  return <ItemList<Running> items={runningList ?? []}>
    {(running) => <RunningCard running={running} {...rest} />}
  </ItemList>
}

export default SuspenseRunningList
