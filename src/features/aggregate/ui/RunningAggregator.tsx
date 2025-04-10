import { Card, CardBody, Divider } from '@heroui/react'
import { BooleanRender } from '@shared/ui/StateRender'
import { useGetAggregate } from '../model/useGetAggregate'
import dayjs from '@shared/lib/dayjs'
import { formatDistance, formatPace } from '@shared/lib/formatter'
import { formatTime } from '@shared/lib/formatter'

export const RunningAggregator: React.FC = () => {
  // 현재 주간 집계 데이터 조회
  const { data: aggregate } = useGetAggregate({
    startTime: dayjs().startOf('week').valueOf(),
    endTime: dayjs().endOf('week').valueOf(),
    isAggregateOnly: true
  })

  const avgPace = aggregate.totalLength ? aggregate.totalTime / aggregate.totalLength : 0
  const avgRunningLength = aggregate.runningItemCount ? aggregate.totalLength / aggregate.runningItemCount : 0

  if (!aggregate) {
    return (
      <Card>
        <CardBody>
          <p className="text-center">집계 데이터가 없습니다.</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        <h3 className="text-xl font-semibold mb-4">주간 통계 요약</h3>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li>
            <p className="text-sm text-default-500">러닝 횟수</p>
            <p className="text-2xl font-bold">{aggregate.runningItemCount}회</p>
          </li>

          <li>
            <p className="text-sm text-default-500">총 거리</p>
            <p className="text-2xl font-bold">{formatDistance(aggregate.totalLength)} km</p>
          </li>

          <li>
            <p className="text-sm text-default-500">총 시간</p>
            <p className="text-2xl font-bold">{formatTime(aggregate.totalTime)}</p>
          </li>

          <li>
            <p className="text-sm text-default-500">평균 페이스</p>
            <p className="text-2xl font-bold">
              <BooleanRender
                state={avgPace}
                render={{
                  true: () => avgPace && formatPace(avgPace),
                  false: () => '-'
                }}
              />
            </p>
          </li>
        </ul>

        <Divider className="my-4" />

        <ul className="flex flex-wrap gap-4">
          <li>
            <p className="text-sm text-default-500">평균 거리</p>
            <p className="text-lg font-semibold">
              <BooleanRender
                state={avgRunningLength}
                render={{
                  true: () => `${formatDistance(avgRunningLength ?? 0)} km`,
                  false: () => '-'
                }}
              />
            </p>
          </li>
        </ul>
      </CardBody>
    </Card >
  )
} 