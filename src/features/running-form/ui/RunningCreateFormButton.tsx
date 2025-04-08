import React from 'react'
import { Button } from '@heroui/react'
import { useRunningForm } from '@entities/running/hooks/useRunningForm'

interface RunningCreateFormButtonProps {
  className?: string
}

const RunningCreateFormButton: React.FC<RunningCreateFormButtonProps> = ({ className }) => {
  const { openForm } = useRunningForm()

  return (
    <Button color="primary" onPress={() => openForm()} className={className}>
      러닝 추가하기
    </Button>
  )
}

export default RunningCreateFormButton 