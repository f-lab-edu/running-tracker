import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
} from '@heroui/react'
import StateRender from '@shared/StateRender'
import { AsyncBoundary } from '@shared/AsyncBoundary'
import RunningModalContent from './RunningModalContent'
import RunningModalSkeleton from './RunningModalSkeleton'
import { useRunningModal } from '@featured/running-modal/hooks/useRunningModal'
import useDeleteRunningMutation from '@featured/running-modal/api/useDeleteRunningMutation'
import { Running } from '@entities/running/model/running'

interface RunningModalProps {
  onModifyOpen?: (running: Running) => void,
  onToggleAggregate?: (params: { id: string, isAggregate: boolean }) => void
}

const RunningModal: React.FC<RunningModalProps> = ({
  onModifyOpen,
  onToggleAggregate
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { isOpen, runningId, closeModal } = useRunningModal()
  const { mutate: deleteRunning } = useDeleteRunningMutation()
  // 집계 토글 처리
  const handleToggleAggregate = async (checked: boolean) => {
    if (!runningId) return
    onToggleAggregate?.({ id: runningId, isAggregate: checked })
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
                onModifyOpen={onModifyOpen}
              />
            </AsyncBoundary>
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default RunningModal 