import useGetRunningQuery from "../model/useGetRunningQuery.ts"
import { RunningDetail } from "@entities/running/ui/RunningDetail"
import { useState } from "react"
import { useDeleteRunningMutation } from "../model/useDeleteRunningMutation.ts"
import { useToggleRunningMutation } from "../model/useToggleRunningMutation.ts"
import { Running } from "@entities/running/constant/running"
interface SuspenseRunningDetailProps {
  id: string
  onClickClose: () => void
  onClickModify: (running: Running) => void
}

const SuspenseRunningDetail = (props: SuspenseRunningDetailProps) => {
  const { id, onClickClose, onClickModify } = props
  const { data } = useGetRunningQuery(id)
  const [isDeleting, setIsDeleting] = useState(false)
  const { mutate: deleteRunning } = useDeleteRunningMutation()
  const { mutate: toggleAggregateRunning } = useToggleRunningMutation()

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteRunning(id, {
      onSuccess: () => {
        onClickClose()
      },
      onError: (error: Error) => {
        console.error('러닝 삭제 오류:', error)
      },
      onSettled: () => {
        setIsDeleting(false)
      }
    })
  }

  return <RunningDetail
    running={data}
    onClickClose={onClickClose}
    isDeleting={isDeleting}
    onClickDelete={handleDelete}
    onClickModify={onClickModify}
    onToggleAggregate={toggleAggregateRunning}
  />
}

export default SuspenseRunningDetail
