import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
} from '@heroui/react'
import StateRender from '@shared/ui/StateRender'
import { useRunningModal } from '@features/running-modal/hooks/useRunningModal'
import { Running } from '@entities/running/model/running'
import { UseMutateFunction } from '@tanstack/react-query'
import AsyncRunningModalContent from './AsyncRunningModalContent'
interface RunningModalProps {
  onModifyOpen?: (running: Running) => void,
  onDelete?: UseMutateFunction<void, Error, string>,
  onToggleAggregate?: (params: { id: string, isAggregate: boolean }) => void
}

const RunningModal: React.FC<RunningModalProps> = ({
  onModifyOpen,
  onToggleAggregate,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { isOpen, runningId, closeModal } = useRunningModal()
  // 집계 토글 처리
  const handleToggleAggregate = async (checked: boolean) => {
    if (!runningId) return
    onToggleAggregate?.({ id: runningId, isAggregate: checked })
  }

  // 삭제 처리
  const handleDelete = async () => {
    if (!runningId) return
    setIsDeleting(true)
    await onDelete?.(runningId, {
      onSuccess: () => {
        closeModal()
      },
      onError: (error) => {
        console.error('러닝 삭제 오류:', error)
      },
      onSettled: () => {
        setIsDeleting(false)
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="lg">
      <ModalContent>
        <StateRender.Boolean
          state={runningId}
          render={{
            true: () => <AsyncRunningModalContent
              runningId={runningId || ''}
              handleToggleAggregate={handleToggleAggregate}
              handleDelete={handleDelete}
              isDeleting={isDeleting}
              closeModal={closeModal}
              onModifyOpen={onModifyOpen}
            />
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default RunningModal 