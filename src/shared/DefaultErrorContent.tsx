import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import StateRender from './StateRender'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Alert,
  Tooltip
} from '@heroui/react'
import { FiAlertCircle, FiRefreshCw, FiX } from 'react-icons/fi'

interface DefaultErrorContentProps extends FallbackProps {
  handleClose?: () => void
}

/**
 * 비동기 모달에서 에러 발생 시 보여줄 기본 컴포넌트
 * - 에러 메시지 표시 및 닫기 기능 제공
 */
export const DefaultErrorContent: React.FC<DefaultErrorContentProps> = ({
  error,
  resetErrorBoundary,
  handleClose
}) => {
  const handleReset = () => {
    resetErrorBoundary()
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="flex gap-3 items-center">
        <FiAlertCircle className="text-danger" size={24} />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">오류가 발생했습니다</h2>
          <p className="text-small text-default-500">요청을 처리하는 중 문제가 발생했습니다</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-default-600 mb-3">다음 오류로 인해 컨텐츠를 불러올 수 없습니다:</p>
        <Alert
          variant="flat"
          color="danger"
          startContent={<FiAlertCircle className="text-danger" />}
        >
          <Tooltip
            content="자세한 오류 정보를 보려면 클릭하세요"
            placement="top"
            color="danger"
            showArrow={true}
          >
            <p className="cursor-help">
              {error?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
          </Tooltip>
        </Alert>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end gap-2">
        <StateRender.Boolean
          state={!!handleClose}
          render={{
            true: () => (
              <Button
                variant="flat"
                color="default"
                startContent={<FiX size={16} />}
                onPress={handleClose!}
              >
                닫기
              </Button>
            )
          }}
        />
        <Button
          color="primary"
          startContent={<FiRefreshCw size={16} />}
          onPress={handleReset}
        >
          다시 시도
        </Button>
      </CardFooter>
    </Card>
  )
}
