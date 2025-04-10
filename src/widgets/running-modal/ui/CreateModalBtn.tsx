import { Button } from "@heroui/react"
import { useRunningModal } from "../hooks/useRunningModal"

const CreateModalBtn = () => {
  const { openRunningModal } = useRunningModal()
  return <Button onPress={() => openRunningModal('insert')}>새 러닝 기록 추가</Button>
}

export default CreateModalBtn
