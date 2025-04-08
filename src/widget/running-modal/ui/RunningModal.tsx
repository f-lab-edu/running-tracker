import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
} from '@heroui/react'
import { useRunningModal } from '@entities/running/hooks/useRunningModal'
import StateRender from '@shared/StateRender'
import { AsyncBoundary } from '@shared/AsyncBoundary'
import RunningModalContent from './RunningModalContent'
import RunningModalSkeleton from './RunningModalSkeleton'
import useToggleRunningAggregateMutation from '@featured/running-list/api/useToggleRunningAggregateMutation'
import useDeleteRunningMutation from '@widget/running-modal/api/useDeleteRunningMutation'
const RunningModal: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { isOpen, runningId, closeModal } = useRunningModal()
  const { mutate: toggleAggregate } = useToggleRunningAggregateMutation()
  const { mutate: deleteRunning } = useDeleteRunningMutation()
  // 집계 토글 처리
  const handleToggleAggregate = async (checked: boolean) => {
    if (!runningId) return
    await toggleAggregate({ id: runningId, isAggregate: checked })
  }

  // 삭제 처리
  const handleDelete = async () => {
    if (!runningId) return
    setIsDeleting(true)
    try {
      await deleteRunning(runningId)
      closeModal()
    } catch (error) {
      console.error('러닝 삭제 오류:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="lg">
      <ModalContent>
        <StateRender.Boolean
          state={runningId}
          render={{
            true: () => <AsyncBoundary
              fallback={<RunningModalSkeleton />}
            >
              <RunningModalContent
                runningId={runningId || ''}
                handleToggleAggregate={handleToggleAggregate}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
                closeModal={closeModal}
              />
            </AsyncBoundary>
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default RunningModal 