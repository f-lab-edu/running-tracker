import { Button } from "@heroui/react"
import { useRunningModal } from "../hooks/useRunningModal"
import { Running } from "@entities/running/constant/running"
import { FC } from "react"

interface UpdateModalBtnProps {
  running: Running
}

const UpdateModalBtn: FC<UpdateModalBtnProps> = ({
  running
}) => {
  const { openRunningModal } = useRunningModal()
  return <Button onPress={() => openRunningModal('update', running)}>러닝 수정하기</Button>
}

export default UpdateModalBtn
