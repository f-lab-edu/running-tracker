import { RunningAggregator, RunningAggregatorSkeleton } from "@features/running-aggregator";
import { AsyncBoundary } from "@shared/ui/AsyncBoundary";

export default function AsyncRunningAggregator() {
  return <AsyncBoundary fallback={<RunningAggregatorSkeleton />}>
    <RunningAggregator />
  </AsyncBoundary>
}