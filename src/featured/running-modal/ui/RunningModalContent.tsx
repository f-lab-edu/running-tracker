import { ModalFooter, Spinner } from "@heroui/react";

import { Button } from "@heroui/react";

import { ModalBody } from "@heroui/react";
import { formatLength, formatPace, runningTimeInSeconds } from "@shared/formatters";

import { Switch } from "@heroui/react";
import { ModalHeader } from "@heroui/react";
import { formatDateTime, formatRunningTime } from "@shared/formatters";
import StateRender from "@shared/StateRender";
import useGetRunning from "../api/useGetRunning";
interface RunningModalContentProps {
  runningId: string
  isDeleting: boolean
  handleToggleAggregate: (checked: boolean) => Promise<void>
  handleDelete: () => Promise<void>
  closeModal: () => void
}

export default function RunningModalContent({
  runningId,
  handleToggleAggregate,
  handleDelete,
  isDeleting,
  closeModal
}: RunningModalContentProps) {
  const { data: running, refetch } = useGetRunning(runningId)

  const handleToggleAggregateWarpped = (checked: boolean) => {
    handleToggleAggregate(checked).then(() => refetch())
  }

  const handleDeleteWarpped = () => {
    handleDelete().then(() => closeModal())
  }

  return (<>
    <ModalHeader className="flex flex-col gap-1 border-b pb-4">
      <div aria-label="러닝 상세 헤더" className="flex justify-between items-center">
        <h3 className="text-lg font-bold">러닝 상세</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-default-500">집계 포함</span>
          <Switch
            isSelected={running.isAggregate}
            onChange={(e) => handleToggleAggregateWarpped(e.target.checked)}
            size="sm"
            color="primary"
          />
        </div>
      </div>
      <p className="text-sm text-default-500">
        {formatDateTime(running.startDateTime, 'YYYY년 MM월 DD일 HH:mm')}
      </p>
    </ModalHeader>
    <ModalBody className="py-5">
      <ul role="article" className="grid grid-cols-2 gap-y-4">
        <li>
          <p className="text-sm text-default-500">거리</p>
          <p className="font-medium">{formatLength(running.length)} km</p>
        </li>
        <li>
          <p className="text-sm text-default-500">시간</p>
          <p className="font-medium">{formatRunningTime(runningTimeInSeconds(running.endDateTime, running.startDateTime))}</p>
        </li>
        <li>
          <p className="text-sm text-default-500">페이스</p>
          <p className="font-medium">{formatPace(running.pace)}</p>
        </li>
        <li>
          <p className="text-sm text-default-500">위치</p>
          <p className="font-medium">{running.location}</p>
        </li>
        <StateRender.Boolean
          state={running.memo}
          render={{
            true: () => (
              <li className="col-span-2">
                <p className="text-sm text-default-500">메모</p>
                <p className="mt-1 p-3 bg-gray-50 rounded text-sm">{running.memo}</p>
              </li>
            )
          }}
        />
      </ul>
    </ModalBody>
    <ModalFooter className="border-t pt-4">
      <Button color="danger" variant="light" onPress={handleDeleteWarpped} isDisabled={isDeleting}>
        {isDeleting ? <Spinner size="sm" /> : '삭제'}
      </Button>
      <Button color="primary" onPress={closeModal}>
        닫기
      </Button>
    </ModalFooter>
  </>
  )
}