import { Modal, ModalContent } from "@heroui/react"

import { } from "@heroui/react"
import { useRunningModal } from "../hooks/useRunningModal"
import { EnumRender } from "@shared/ui/StateRender"
import SuspenseRunningDetail from "@features/running/ui/SuspenseRunningDetail"
import RunningForm from "@features/running/ui/RunningForm"
import AsyncBoundary from "@shared/ui/AsyncBoundary"
import RunningListSkeleton from "@features/running/ui/RunningListSkeleton"
import { useUpdateRunningMutation } from "@features/running/model/useUpdateRunningMutation"
import { useInsertRunningMutation } from "@features/running/model/useInsertRunningMutation"
import { Running } from "@entities/running/constant/running"
import { RunningFormResult } from "@features/running/constant/form"
const RunningModal = () => {
  const { runningModal, closeRunningModal, openRunningModal } = useRunningModal()

  const { mutate: updateRunning } = useUpdateRunningMutation()
  const { mutate: insertRunning } = useInsertRunningMutation()

  const handlerGotoUpdate = (running: Running) => {
    openRunningModal('update', running)
  }
  const handleInsertRunning = (running: RunningFormResult) => {
    insertRunning(running)
    closeRunningModal()
  }
  const handleUpdateRunning = (running: RunningFormResult) => {
    if (!running.id) {
      throw new Error('id가 없습니다')
    }
    updateRunning(running as Running)
    closeRunningModal()
  }

  return <Modal isOpen={Boolean(runningModal.type)} onClose={closeRunningModal} hideCloseButton>
    <ModalContent>
      <EnumRender
        state={runningModal.type ?? 'null'}
        render={{
          detail: () => runningModal.running && <AsyncBoundary pendingFallback={<RunningListSkeleton />}>
            <SuspenseRunningDetail id={runningModal.running?.id} onClickClose={closeRunningModal} onClickModify={handlerGotoUpdate} />
          </AsyncBoundary>,
          insert: () => <RunningForm onClose={closeRunningModal} onSubmit={handleInsertRunning} />,
          update: () => runningModal.running && <RunningForm running={runningModal.running} onClose={closeRunningModal} onSubmit={handleUpdateRunning} />,
          null: () => null
        }}
      />
    </ModalContent>
  </Modal>
}

export default RunningModal