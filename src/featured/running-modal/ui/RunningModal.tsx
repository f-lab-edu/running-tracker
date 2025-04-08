import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Switch,
  Spinner
} from '@heroui/react'
import { fetchRunningById, toggleRunningAggregate, deleteRunning } from '../../../entities/running/api/runningApi'
import { formatPace, formatLength, formatRunningTime, formatDateTime } from '../../../shared/formatters'
import { useRunningModal } from '../hooks/useRunningModal'
import StateRender from '@shared/StateRender'

const RunningModal: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { isOpen, runningId, closeModal } = useRunningModal()

  // 데이터 조회
  const { data: running, isLoading, refetch } = useQuery({
    queryKey: ['running', runningId],
    queryFn: () => (runningId ? fetchRunningById(runningId) : null),
    enabled: !!runningId && isOpen,
  })

  // 집계 토글 처리
  const handleToggleAggregate = async (checked: boolean) => {
    if (!running) return
    await toggleRunningAggregate(running.id, checked)
    refetch()
  }

  // 삭제 처리
  const handleDelete = async () => {
    if (!running) return
    setIsDeleting(true)

    try {
      await deleteRunning(running.id)
      setIsDeleting(false)
      closeModal()
    } catch (error) {
      console.error('러닝 삭제 오류:', error)
      setIsDeleting(false)
    }
  }

  // 러닝 시간 계산
  const getRunningTime = () => {
    if (!running) return '0:00'
    const runningTimeInSeconds = (running.endDateTime - running.startDateTime) / 1000
    return formatRunningTime(runningTimeInSeconds)
  }

  if (!running && !isLoading) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="lg">
      <ModalContent>
        {isLoading ? (
          <ModalBody className="flex justify-center items-center py-10">
            <Spinner size="lg" />
          </ModalBody>
        ) : running && (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b pb-4">
              <div aria-label="러닝 상세 헤더" className="flex justify-between items-center">
                <h3 className="text-lg font-bold">러닝 상세</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-default-500">집계 포함</span>
                  <Switch
                    isSelected={running.isAggregate}
                    onChange={(e) => handleToggleAggregate(e.target.checked)}
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
                  <p className="font-medium">{getRunningTime()}</p>
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
              <Button color="danger" variant="light" onPress={handleDelete} isDisabled={isDeleting}>
                {isDeleting ? <Spinner size="sm" /> : '삭제'}
              </Button>
              <Button color="primary" onPress={closeModal}>
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default RunningModal 