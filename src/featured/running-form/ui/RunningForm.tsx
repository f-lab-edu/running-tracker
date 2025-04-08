import React from 'react'
import { Modal, ModalContent } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRunningForm as useRunningForm } from '../hooks/useRunningForm'
import RunningCreateFormContent from './RunningFormContent'
import StateRender from '@shared/StateRender'
import { RunningFormObject } from '../model/runningForm'
import { createRunning } from '../api/runningCreateApi'
import { updateRunning } from '../api/runningModifyApi'


const RunningForm: React.FC = () => {
  const { isOpen, closeForm, running } = useRunningForm()
  const queryClient = useQueryClient()

  const callback = () => {
    queryClient.invalidateQueries({ queryKey: ['runnings'] })
    queryClient.invalidateQueries({ queryKey: ['aggregate'] })
    handleCloseModal()
  }

  // 러닝 editor mutation
  const editorMutation = useMutation({
    mutationFn: (data: RunningFormObject) => running ? updateRunning(running.id, data) : createRunning(data),
    onSuccess: callback,
  })

  // 폼 제출 핸들러
  const onSubmit = async (data: RunningFormObject) => {
    editorMutation.mutate(data)
    closeForm()
  }

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    closeForm()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
      <ModalContent>
        <StateRender.Boolean
          state={isOpen}
          render={{
            true: () => <RunningCreateFormContent
              handleCloseModal={handleCloseModal}
              onSubmit={onSubmit}
              data={running}
            />
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default RunningForm 