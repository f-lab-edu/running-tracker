import React from 'react'
import StateRender from '@shared/ui/StateRender'
import { useRunningFilter } from '@features/running-list/hooks/useRunningFilter'
import useRunningListQuery from '@features/running-list/hooks/useRunningListQuery'
import { Running } from '@entities/running/model/running'

export interface RunningListProps {
  daily?: boolean
  weekly?: boolean
  children?: (running: Running) => React.ReactNode
}

export const RunningList: React.FC<RunningListProps> = ({ daily, weekly, children }) => {
  const filter = useRunningFilter({ daily, weekly })

  // 데이터 조회
  const { data: runnings } = useRunningListQuery(filter)

  return (
    <StateRender.Boolean
      state={runnings.length}
      render={{
        true: () => (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {runnings.map((running: Running) => (
              <li key={running.id}>
                {children?.(running)}
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