import React from 'react'
import { Button } from '@heroui/react'
import { useRunningCreateForm } from '../hooks/useRunningCreateForm'

interface RunningCreateFormButtonProps {
  className?: string
}

const RunningCreateFormButton: React.FC<RunningCreateFormButtonProps> = ({ className }) => {
  const { openForm } = useRunningCreateForm()

  return (
    <Button color="primary" onPress={() => openForm()} className={className}>
      러닝 추가하기
    </Button>
  )
}

export default RunningCreateFormButton 