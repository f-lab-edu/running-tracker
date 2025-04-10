import { Modal } from "@heroui/react"

import { } from "@heroui/react"
import { useRunningModal } from "../hooks/useRunningModal"
import { EnumRender } from "@shared/ui/StateRender"
import SuspenseRunningDetail from "@features/running/ui/SuspenseRunningDetail"
import RunningForm from "@features/running/ui/RunningForm"
import AsyncBoundary from "@shared/ui/AsyncBoundary"
import RunningListSkeleton from "@features/running/ui/RunningListSkeleton"

const RunningModal = () => {
  const { runningModal, closeRunningModal } = useRunningModal()
  return <Modal isOpen={Boolean(runningModal.type)}>
    <EnumRender
      state={runningModal.type ?? 'null'}
      render={{
        detail: () => runningModal.running && <AsyncBoundary pendingFallback={<RunningListSkeleton />}>
          <SuspenseRunningDetail id={runningModal.running?.id} onClickClose={closeRunningModal} />
        </AsyncBoundary>,
        insert: () => <RunningForm onClose={closeRunningModal} onSubmit={() => { }} />,
        update: () => runningModal.running && <RunningForm running={runningModal.running} onClose={closeRunningModal} onSubmit={() => { }} />,
        null: () => null
      }}
    />
  </Modal>
}

export default RunningModal