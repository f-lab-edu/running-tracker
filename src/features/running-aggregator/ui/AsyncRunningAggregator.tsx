import { AsyncBoundary } from "@shared/ui/AsyncBoundary";
import { RunningAggregator } from "./RunningAggregator";
import { RunningAggregatorSkeleton } from "./RunningAggregatorSkeleton";

export default function AsyncRunningAggregator() {
  return <AsyncBoundary fallback={<RunningAggregatorSkeleton />}>
    <RunningAggregator />
  </AsyncBoundary>
}