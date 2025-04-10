import { AsyncBoundary } from "@shared/ui/AsyncBoundary";
import RunningModalContent, { RunningModalContentProps } from "./RunningModalContent";
import RunningModalContentSkeleton from "./RunningModalContentSkeleton";

const AsyncRunningModalContent: React.FC<RunningModalContentProps> = (props) => {
  return <AsyncBoundary fallback={<RunningModalContentSkeleton />}>
    <RunningModalContent {...props} />
  </AsyncBoundary>
}
export default AsyncRunningModalContent
