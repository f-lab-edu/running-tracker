import React from 'react'
import { Modal, ModalContent } from '@heroui/react'
import RunningFormContent from './RunningFormContent'
import StateRender from '@shared/StateRender'
import { useRunningForm } from '@features/running-form/hooks/useRunningForm'
import { RunningFormObject } from '../model/runningForm'
import { Running } from '@entities/running/model/running'
import { UseMutateFunction } from '@tanstack/react-query'

interface RunningFormProps {
  upsertRunning: UseMutateFunction<Running, Error, RunningFormObject>
}

const RunningForm: React.FC<RunningFormProps> = ({
  upsertRunning
}) => {
  const { isOpen, closeForm, running } = useRunningForm()

  // 폼 제출 핸들러
  const onSubmit = (data: RunningFormObject) => {
    upsertRunning(data, {
      onSuccess: () => {
        closeForm()
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={closeForm} size="lg">
      <ModalContent>
        <StateRender.Boolean
          state={isOpen}
          render={{
            true: () => <RunningFormContent
              handleCloseModal={closeForm}
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