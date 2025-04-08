import { Card, CardBody } from "@heroui/react";

export default function RunningListSkeleton() {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-center items-center h-40">
          <p className="text-default-500">목록을 불러오는 중...</p>
        </div>
      </CardBody>
    </Card>
  )
}