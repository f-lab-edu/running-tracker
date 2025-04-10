import { FC } from "react";
import { Aggregate } from "../constant/aggregate";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { formatDistance, formatPace, formatTime } from "@shared/lib/formatter";
import { BooleanRender } from "@shared/ui/StateRender";

interface AggregateIndicatorProps extends Aggregate {
  title: string;
}

const AggregateIndicator: FC<AggregateIndicatorProps> = ({ title, totalLength, totalTime, runningItemCount }) => {
  const averageLength = runningItemCount === 0 ? 0 : totalLength / runningItemCount;
  const averagePace = totalLength === 0 ? 0 : totalTime / totalLength;
  return <Card>
    <CardHeader>
      <h3 className="text-lg font-bold">{title}</h3>
    </CardHeader>
    <CardBody>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <li>
          <p className="text-sm text-default-500">러닝 횟수</p>
          <p className="text-2xl font-bold">{runningItemCount}회</p>
        </li>

        <li>
          <p className="text-sm text-default-500">총 거리</p>
          <p className="text-2xl font-bold">{formatDistance(totalLength)} km</p>
        </li>

        <li>
          <p className="text-sm text-default-500">총 시간</p>
          <p className="text-2xl font-bold">{formatTime(totalTime)}</p>
        </li>

        <li>
          <p className="text-sm text-default-500">평균 페이스</p>
          <p className="text-2xl font-bold">
            <BooleanRender
              state={averagePace}
              render={{
                true: () => formatPace(averagePace),
                false: () => '-'
              }}
            />
          </p>
        </li>
      </ul>
      <Divider />
      <ul className="flex flex-wrap gap-4">
        <li>
          <p className="text-sm text-default-500">평균 거리</p>
          <p className="text-lg font-semibold">
            <BooleanRender
              state={averageLength}
              render={{
                true: () => `${formatDistance(averageLength)} km`,
                false: () => '-'
              }}
            />
          </p>
        </li>
      </ul>
    </CardBody>
  </Card>;
};

export default AggregateIndicator;