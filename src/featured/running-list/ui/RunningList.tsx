import React from 'react'
import RunningCard from '@entities/running/ui/RunningCard'
import StateRender from '@shared/StateRender'
import { useRunningFilter } from '@featured/running-list/hooks/useRunningFilter'
import useRunningListQuery from '@featured/running-list/api/useRunningListQuery'
import { Running } from '@entities/running/model/running'
import useToggleRunningAggregateMutation from '@featured/running-list/api/useToggleRunningAggregateMutation'

interface RunningListProps {
  daily?: boolean
  weekly?: boolean
  openModal?: (id: string) => void
}

export const RunningList: React.FC<RunningListProps> = ({ daily, weekly, openModal }) => {
  const filter = useRunningFilter({ daily, weekly })

  // 데이터 조회
  const { data: runnings = [], refetch } = useRunningListQuery(filter)
  const { mutate: toggleAggregate } = useToggleRunningAggregateMutation()

  // 집계 토글 처리
  const handleToggleAggregate = async (id: string, isAggregate: boolean) => {
    await toggleAggregate({ id, isAggregate })
    refetch()
  }

  // 카드 클릭 처리
  const handleCardClick = (id: string) => {
    if (openModal) {
      openModal(id)
    }
  }

  return (
    <StateRender.Boolean
      state={runnings.length}
      render={{
        true: () => (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {runnings.map((running: Running) => (
              <li key={running.id}>
                <RunningCard
                  running={running}
                  onToggleAggregate={handleToggleAggregate}
                  onCardClick={handleCardClick}
                />
              </li>
            ))}
          </ul>
        ),
        false: () => (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">기록된 러닝이 없습니다.</p>
          </div>
        )
      }}
    />
  )
} 