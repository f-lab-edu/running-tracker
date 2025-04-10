import { Running } from "@entities/running/constant/running"
import { Button, Checkbox, Input, ModalBody, ModalFooter, ModalHeader, Textarea } from "@heroui/react"
import { BooleanRender } from "@shared/ui/StateRender"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RunningFormSchema, FormDataAsRunning, RunningFormDefaultValues, RunningAsFormData, RunningForm as RunningFormType, RunningFormResult } from "../constant/form"
import { getPace } from "@shared/lib/transfomer"
import { useMemo } from "react"
import dayjs from "@shared/lib/dayjs"
interface RunningFormProps {
  running?: Running
  onSubmit: (running: RunningFormResult) => void
  onClose: () => void
}

const RunningForm = (props: RunningFormProps) => {
  const { running, onSubmit, onClose } = props
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: RunningFormDefaultValues,
    resolver: zodResolver(RunningFormSchema),
    values: FormDataAsRunning.parse(running),
    mode: 'onBlur'
  })

  const handleSubmitAction = (data: RunningFormType) => {
    onSubmit(RunningAsFormData.parse(data))
  }

  const endTime = watch('endTime')
  const startTime = watch('startTime')
  const length = watch('length')
  const pace = useMemo(() => String(getPace(length, dayjs(endTime).diff(dayjs(startTime), 'seconds'))), [length, endTime, startTime])

  return <form onSubmit={handleSubmit(handleSubmitAction)}>
    <ModalHeader className="flex flex-col gap-1">
      <BooleanRender
        state={running}
        render={{
          true: () => '러닝 수정하기',
          false: () => '새 러닝 기록 추가'
        }}
      />
    </ModalHeader>
    <ModalBody>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li>
          <label className="block text-small font-medium mb-1">
            거리 (km)<span className="text-red-500">*</span>
            <Input
              type="number"
              step={0.01}
              isRequired
              isInvalid={!!errors.length}
              errorMessage={errors.length?.message}
              {...register('length', {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </label>
        </li>
        <li>
          <label className="block text-small font-medium mb-1">
            위치<span className="text-red-500">*</span>
            <Input
              type="text"
              isRequired
              isInvalid={!!errors.location}
              errorMessage={errors.location?.message}
              {...register('location')}
            />
          </label>
        </li>
        <li>
          <label className="block text-small font-medium mb-1">
            시작 시간<span className="text-red-500">*</span>
            <Input
              type="datetime-local"
              isRequired
              isInvalid={!!errors.startTime}
              errorMessage={errors.startTime?.message}
              {...register('startTime')}
            />
          </label>
        </li>
        <li>
          <label className="block text-small font-medium mb-1">
            종료 시간<span className="text-red-500">*</span>
            <Input
              type="datetime-local"
              isRequired
              isInvalid={!!errors.endTime}
              errorMessage={errors.endTime?.message}
              {...register('endTime')}
            />
          </label>
        </li>

        <li className="col-span-2">
          <label className="block text-small font-medium mb-1">
            페이스 (분/km)
            <Input
              type="number"
              min="0"
              step="0.01"
              isDisabled
              value={pace}
            />
          </label>
          <p className="text-small text-default-500 mt-1">
            * 거리와 시간에 따라 자동 계산됩니다.
          </p>
        </li>

        <li className="col-span-2">
          <label className="block text-small font-medium mb-1">
            메모
            <Textarea
              rows={3}
              isInvalid={!!errors.memo}
              errorMessage={errors.memo?.message}
              {...register('memo')}
            />
          </label>
        </li>

        <li className="col-span-2">
          <Checkbox
            {...register('isAggregate')}
          >
            집계에 포함하기
          </Checkbox>
        </li>
      </ul>
    </ModalBody>
    <ModalFooter>
      <Button color="danger" variant="light" onPress={onClose}>
        취소
      </Button>
      <Button color="primary" type="submit" isLoading={isSubmitting}>
        저장
      </Button>
    </ModalFooter>
  </form>
}

export default RunningForm