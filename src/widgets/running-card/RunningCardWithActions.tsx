import RunningCard from "@entities/running/ui/RunningCard";
import { Running } from "@entities/running/model";
import { useRunningModal } from "@features/running-modal/hooks/useRunningModal";
import useToggleRunningAggregateByIdMutation from "@entities/running/hooks/useToggleRunningAggregateByIdMutation";

interface RunningCardWithActionsProps {
  running: Running
}

const RunningCardWithActions: React.FC<RunningCardWithActionsProps> = ({
  running,
}) => {
  const { openModal } = useRunningModal()
  const { mutate: toggleAggregate } = useToggleRunningAggregateByIdMutation()
  return <RunningCard
    running={running}
    onToggleAggregate={toggleAggregate}
    onCardClick={openModal}
  />
}
export default RunningCardWithActions