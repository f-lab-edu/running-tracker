import React from 'react'
import { Button } from '@heroui/react'
import { useRunningCreateForm } from '../hooks/useRunningCreateForm'
import { Running } from '@entities/running/model/running'

interface RunningModifyFormButtonProps {
  className?: string
  running: Running
  onPress: () => void
}

const RunningModifyFormButton: React.FC<RunningModifyFormButtonProps> = ({ className, running, onPress }) => {
  const { openForm } = useRunningCreateForm()

  return (
    <Button color="primary" onPress={() => {
      openForm(running)
      onPress()
    }} className={className}>
      러닝 수정하기
    </Button>
  )
}

export default RunningModifyFormButton 