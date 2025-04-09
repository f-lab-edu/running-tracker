import { AsyncBoundary } from "@shared/ui/AsyncBoundary";
import { RunningList, RunningListProps } from "./RunningList";
import RunningListSkeleton from "./RunningListSkeleton";



export default function AsyncRunningList(props: RunningListProps) {
  return <AsyncBoundary fallback={<RunningListSkeleton />}>
    <RunningList {...props} />
  </AsyncBoundary>
}
