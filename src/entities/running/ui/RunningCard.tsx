import { Card, CardBody, CardHeader, Divider, Switch, Tooltip } from "@heroui/react"
import { Running, ToggleAggregateProps } from "../constant/running";
import { formatDateTime, formatDistance, formatPace, formatTime } from "@shared/lib/formatter";
import { BooleanRender } from "@shared/ui/StateRender";

interface RunningCardProps {
  running: Running
  onClick: (running: Running) => void;
  onToggleAggregate: (props: ToggleAggregateProps) => void;
}

export const RunningCard: React.FC<RunningCardProps> = (props) => {
  const { running, onClick, onToggleAggregate } = props;
  const { id, length, startTime, location, memo, isAggregate, runningDuration, pace } = running;
  const handlePress = () => {
    onClick(running)
  }
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    onToggleAggregate({ id, isAggregate: event.target.checked })
  }

  return <Card
    onPress={handlePress}
    className="w-full cursor-pointer hover:shadow-md transition-shadow"
    isPressable
    shadow="sm"
  >
    <CardHeader>
      <header className="flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <p className="text-sm text-default-500">{formatDateTime(startTime)}</p>
          <p className="text-sm text-default-500">{location}</p>
        </div>
      </header>
    </CardHeader>
    <Divider />
    <CardBody>
      <ul className="grid grid-cols-2 gap-3">
        <li>
          <p className="text-small text-default-500">거리</p>
          <p className="font-semibold">{formatDistance(length)} km</p>
        </li>
        <li>
          <p className="text-small text-default-500">시간</p>
          <p className="font-semibold">{formatTime(runningDuration)}</p>
        </li>
        <li>
          <p className="text-small text-default-500">페이스</p>
          <p className="font-semibold">{formatPace(pace)}</p>
        </li>
        <li>
          <p className="text-small text-default-500">집계</p>
          <Tooltip content={isAggregate ? "집계에서 제외하기" : "집계에 포함하기"}>
            <Switch
              isSelected={isAggregate}
              onChange={handleToggle}
              size="sm"
              color="primary"
            />
          </Tooltip>
        </li>
        <BooleanRender
          state={memo}
          render={{
            true: () => <>
              <Divider className="my-3 col-span-2" />
              <li className="col-span-2">
                <p className="text-small text-default-500">메모</p>
                <p className="text-sm mt-1">{memo}</p>
              </li>
            </>,
            false: () => null
          }}
        />
      </ul>
    </CardBody>
  </Card>
}