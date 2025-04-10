import { Card, CardBody } from "@heroui/react";

export const RunningAggregatorSkeleton: React.FC = () => {
  return <Card>
    <CardBody>
      <div className="flex justify-center items-center h-40">
        <p className="text-default-500">통계를 불러오는 중...</p>
      </div>
    </CardBody>
  </Card>
}