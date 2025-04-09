import { Card, CardBody, Divider } from '@heroui/react'
import { formatLength, formatRunningTime, formatPace } from '@shared/lib/formatters'
import StateRender from '@shared/ui/StateRender'
import useGetAggregate from '@features/running-aggregator/api/useGetAggregate'
export const RunningAggregator: React.FC = () => {
  // 현재 주간 집계 데이터 조회
  const { data: aggregate } = useGetAggregate()

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
            <p className="text-2xl font-bold">{aggregate.itemsCount}회</p>
          </li>

          <li>
            <p className="text-sm text-default-500">총 거리</p>
            <p className="text-2xl font-bold">{formatLength(aggregate.totalRunningLength)} km</p>
          </li>

          <li>
            <p className="text-sm text-default-500">총 시간</p>
            <p className="text-2xl font-bold">{formatRunningTime(aggregate.totalRunningTime)}</p>
          </li>

          <li>
            <p className="text-sm text-default-500">평균 페이스</p>
            <p className="text-2xl font-bold">
              {aggregate.avgPace ? formatPace(aggregate.avgPace) : '-'}
            </p>
          </li>
        </ul>

        <Divider className="my-4" />

        <ul className="flex flex-wrap gap-4">
          <li>
            <p className="text-sm text-default-500">평균 거리</p>
            <p className="text-lg font-semibold">
              <StateRender.Boolean
                state={aggregate.avgRunningLength}
                render={{
                  true: () => aggregate.avgRunningLength && `${formatLength(aggregate.avgRunningLength)} km`,
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