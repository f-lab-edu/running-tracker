import { AsyncBoundary } from "@shared/ui/AsyncBoundary";
import RunningModalContent, { RunningModalContentProps } from "./RunningModalContent";
import RunningModalContentSkeleton from "./RunningModalContentSkeleton";

export default function AsyncRunningModalContent(props: RunningModalContentProps) {
  return <AsyncBoundary fallback={<RunningModalContentSkeleton />}>
    <RunningModalContent {...props} />
  </AsyncBoundary>
}
