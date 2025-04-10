import { FC } from "react";
import { Running, ToggleAggregateProps } from "../constant/running";
import { BooleanRender } from "@shared/ui/StateRender";
import { formatDistance, formatPace, formatTime, formatDateTime } from "@shared/lib/formatter";
import { ModalHeader, ModalBody, Switch, ModalFooter, Button } from "@heroui/react";

interface RunningDetailProps {
  running: Running;
  onClickClose: () => void;
  isDeleting: boolean;
  onClickDelete?: (running: Running) => void;
  onClickModify?: (running: Running) => void;
  onToggleAggregate: (props: ToggleAggregateProps) => void;
}

export const RunningDetail: FC<RunningDetailProps> = (props) => {
  const { running, onClickClose, onClickDelete, onClickModify, onToggleAggregate, isDeleting } = props;
  const { id, length, startTime, location, memo, isAggregate, runningDuration, pace } = running;
  const handleToggleAggregate = (isAggregate: boolean) => {
    onToggleAggregate({ id, isAggregate });
  }
  return <>
    <ModalHeader className="flex flex-col gap-1 border-b pb-4">
      <div aria-label="러닝 상세 헤더" className="flex justify-between items-center">
        <h3 className="text-lg font-bold">러닝 상세</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-default-500">집계 포함</span>
          <Switch
            isSelected={isAggregate}
            onChange={(e) => handleToggleAggregate(e.target.checked)}
            size="sm"
            color="primary"
          />
        </div>
      </div>
      <p className="text-sm text-default-500">
        {formatDateTime(startTime, 'YYYY년 MM월 DD일 HH:mm')}
      </p>
    </ModalHeader>
    <ModalBody className="py-5">
      <ul role="contentinfo" className="grid grid-cols-2 gap-y-4">
        <li>
          <p className="text-sm text-default-500">거리</p>
          <p className="font-medium">{formatDistance(length)} km</p>
        </li>
        <li>
          <p className="text-sm text-default-500">시간</p>
          <p className="font-medium">{formatTime(runningDuration)}</p>
        </li>
        <li>
          <p className="text-sm text-default-500">페이스</p>
          <p className="font-medium">{formatPace(pace)}</p>
        </li>
        <li>
          <p className="text-sm text-default-500">위치</p>
          <p className="font-medium">{location}</p>
        </li>
        <BooleanRender
          state={memo}
          render={{
            true: () => (
              <li className="col-span-2">
                <p className="text-sm text-default-500">메모</p>
                <p className="mt-1 p-3 bg-gray-50 rounded text-sm">{memo}</p>
              </li>
            )
          }}
        />
      </ul>
    </ModalBody>
    <ModalFooter>
      <BooleanRender
        state={onClickDelete}
        render={{
          true: () => <Button color="danger" variant="light" onPress={() => onClickDelete?.(running)} isDisabled={isDeleting} spinner={isDeleting}>
            삭제
          </Button>
        }}
      />
      <BooleanRender
        state={onClickModify}
        render={{
          true: () => <Button color="primary" onPress={() => onClickModify?.(running)}>수정</Button>
        }}
      />
      <Button color="danger" variant="light" onPress={onClickClose}>
        닫기
      </Button>
    </ModalFooter>
  </>
}