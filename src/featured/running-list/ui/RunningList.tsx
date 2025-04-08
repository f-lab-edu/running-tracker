import React from 'react'
import { toggleRunningAggregate } from '@entities/running/api/runningApi'
import RunningCard from '@entities/running/ui/RunningCard'
import { useRunningModal } from '@widget/running-modal/hooks/useRunningModal'
import StateRender from '@shared/StateRender'
import { useRunningFilter } from '../hooks/useRunningFilter'
import useRunningList from '../api/useRunninglist'

interface RunningListProps {
  daily?: boolean
  weekly?: boolean
}

export const RunningList: React.FC<RunningListProps> = ({ daily, weekly }) => {
  const { openModal } = useRunningModal()
  const filter = useRunningFilter({ daily, weekly })

  // 데이터 조회
  const { data: runnings = [], refetch } = useRunningList(filter)

  // 집계 토글 처리
  const handleToggleAggregate = async (id: string, isAggregate: boolean) => {
    await toggleRunningAggregate(id, isAggregate)
    refetch()
  }

  // 카드 클릭 처리
  const handleCardClick = (id: string) => {
    openModal(id)
  }

  return (
    <div>
      <StateRender.Boolean
        state={runnings.length}
        render={{
          true: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {runnings.map((running) => (
                <RunningCard
                  key={running.id}
                  running={running}
                  onToggleAggregate={handleToggleAggregate}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          ),
          false: () => (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">기록된 러닝이 없습니다.</p>
            </div>
          )
        }}
      />
    </div>
  )
} 