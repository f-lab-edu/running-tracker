import { AsyncBoundary } from "@shared/ui/AsyncBoundary";
import { RunningList, RunningListProps } from "./RunningList";
import RunningListSkeleton from "./RunningListSkeleton";



const AsyncRunningList: React.FC<RunningListProps> = (props) => {
  return <AsyncBoundary fallback={<RunningListSkeleton />}>
    <RunningList {...props} />
  </AsyncBoundary>
}
export default AsyncRunningList
