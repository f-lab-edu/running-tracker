import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Switch,
  Chip,
  Divider,
  CardFooter,
  Tooltip
} from '@heroui/react'
import { Running } from '@entities/running/model/running'
import dayjs from '@shared/dayjs'
import { formatPace, formatLength, formatRunningTime, runningTimeInSeconds } from '@shared/formatters'
import StateRender from '@shared/StateRender'

interface RunningCardProps {
  running: Running
  onToggleAggregate: (params: { id: string, isAggregate: boolean }) => void
  onCardClick: (id: string) => void
}

const RunningCard: React.FC<RunningCardProps> = ({
  running,
  onToggleAggregate,
  onCardClick
}) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    onToggleAggregate({ id: running.id, isAggregate: event.target.checked })
  }

  const seconds = runningTimeInSeconds(running.endDateTime, running.startDateTime)

  return (
    <Card
      className="w-full cursor-pointer hover:shadow-md transition-shadow"
      onPress={() => onCardClick(running.id)}
      isPressable
      shadow="sm"
    >
      <CardHeader className="flex gap-3">
        <div className="flex flex-col flex-grow">
          <div className="flex gap-2">
            <p className="text-lg font-semibold">{dayjs(running.startDateTime).format('YYYY년 MM월 DD일')}</p>
          </div>
          <Tooltip content={`위치: ${running.location}`}>
            <p className="text-small text-default-500">{running.location}</p>
          </Tooltip>
        </div>
        <div>
          <Tooltip content={running.isAggregate ? "집계에서 제외하기" : "집계에 포함하기"}>
            <Switch
              isSelected={running.isAggregate}
              onChange={handleToggle}
              size="sm"
              color="primary"
            />
          </Tooltip>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="pt-3">
        <ul className="grid grid-cols-2 gap-3">
          <li>
            <p className="text-small text-default-500">거리</p>
            <p className="font-semibold">{formatLength(running.length)} km</p>
          </li>
          <li>
            <p className="text-small text-default-500">시간</p>
            <p className="font-semibold">{formatRunningTime(seconds)}</p>
          </li>
          <li>
            <p className="text-small text-default-500">페이스</p>
            <p className="font-semibold">{formatPace(running.pace)}</p>
          </li>
          <li>
            <p className="text-small text-default-500">집계</p>
            <StateRender.Boolean
              state={running.isAggregate}
              render={{
                true: () => <Chip
                  size="sm"
                  color="primary"
                  variant="solid"
                  className="transition-colors"
                  radius="sm"
                >
                  포함
                </Chip>,
                false: () => <Chip
                  size="sm"
                  color="default"
                  variant="flat"
                  className="transition-colors"
                  radius="sm"
                >
                  제외
                </Chip>
              }}
            />
          </li>
          <StateRender.Boolean
            state={running.memo}
            render={{
              true: () => <>
                <Divider className="my-3 col-span-2" />
                <li className="col-span-2">
                  <p className="text-small text-default-500">메모</p>
                  <p className="text-sm mt-1">{running.memo}</p>
                </li>
              </>,
              false: () => null
            }}
          />
        </ul>
      </CardBody>
      <CardFooter className="gap-2 flex justify-end text-xs text-default-400">
        {dayjs(running.startDateTime).format('HH:mm')} ~ {dayjs(running.endDateTime).format('HH:mm')}
      </CardFooter>
    </Card>
  )
}

export default RunningCard 