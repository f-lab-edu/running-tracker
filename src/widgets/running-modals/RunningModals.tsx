import RunningForm from "@features/running-form/ui/RunningForm";
import RunningModal from "@features/running-modal/ui/RunningModal";
import useDeleteRunningByIdMutation from "@entities/running/hooks/useDeleteRunningByIdMutation";
import useToggleRunningAggregateByIdMutation from "@entities/running/hooks/useToggleRunningAggregateByIdMutation";
import { useRunningForm } from "@features/running-form/hooks/useRunningForm";
import useUpsertRunningMutation from "@entities/running/hooks/useUpsertRunningMutation";

export default function RunningModals() {
  const { openForm } = useRunningForm()
  const { mutate: toggleAggregate } = useToggleRunningAggregateByIdMutation()
  const { mutate: deleteRunning } = useDeleteRunningByIdMutation()
  const { mutate: upsertRunning } = useUpsertRunningMutation()
  return <>
    <RunningModal onModifyOpen={openForm} onToggleAggregate={toggleAggregate} onDelete={deleteRunning} />
    <RunningForm upsertRunning={upsertRunning} />
  </>
}