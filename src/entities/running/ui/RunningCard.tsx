import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Switch,
  Chip,
  Divider,
  CardFooter,
  Tooltip,
  Badge
} from '@heroui/react'
import { Running } from '@entities/running/model/running'
import dayjs from '@shared/dayjs'
import { formatPace, formatLength, formatRunningTime } from '@shared/formatters'

interface RunningCardProps {
  running: Running
  onToggleAggregate: (id: string, isAggregate: boolean) => void
  onCardClick: (id: string) => void
}

const RunningCard: React.FC<RunningCardProps> = ({
  running,
  onToggleAggregate,
  onCardClick
}) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    onToggleAggregate(running.id, event.target.checked)
  }

  const runningTimeInSeconds = (running.endDateTime - running.startDateTime) / 1000

  return (
    <Card
      className="w-full cursor-pointer hover:shadow-md transition-shadow"
      onPress={() => onCardClick(running.id)}
      isPressable
      shadow="sm"
    >
      <CardHeader className="flex gap-3">
        <div className="flex flex-col flex-grow">
          <Badge content={dayjs(running.startDateTime).format('MM/DD')} color="primary" size="sm">
            <p className="text-lg font-semibold">{dayjs(running.startDateTime).format('YYYY년 MM월 DD일')}</p>
          </Badge>
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-small text-default-500">거리</p>
            <p className="font-semibold">{formatLength(running.length)} km</p>
          </div>
          <div>
            <p className="text-small text-default-500">시간</p>
            <p className="font-semibold">{formatRunningTime(runningTimeInSeconds)}</p>
          </div>
          <div>
            <p className="text-small text-default-500">페이스</p>
            <p className="font-semibold">{formatPace(running.pace)}</p>
          </div>
          <div>
            <p className="text-small text-default-500">집계</p>
            <Chip
              size="sm"
              color={running.isAggregate ? "primary" : "default"}
              variant={running.isAggregate ? "solid" : "flat"}
              className="transition-colors"
              radius="sm"
            >
              {running.isAggregate ? '포함' : '제외'}
            </Chip>
          </div>
        </div>
        {running.memo && (
          <>
            <Divider className="my-3" />
            <div>
              <p className="text-small text-default-500">메모</p>
              <p className="text-sm mt-1">{running.memo}</p>
            </div>
          </>
        )}
      </CardBody>
      <CardFooter className="gap-2 flex justify-end text-xs text-default-400">
        {dayjs(running.startDateTime).format('HH:mm')} ~ {dayjs(running.endDateTime).format('HH:mm')}
      </CardFooter>
    </Card>
  )
}

export default RunningCard 