import { Input, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "@shared/dayjs";
import { RunningFormObject, RunningFormSchema, RunningForm, RunningFormDefaultValues, RunningFormTransform, DataAsRunningForm } from "@featured/running-form/model/runningForm";
import { calculatePace } from "@shared/formatters";
import StateRender from "@shared/StateRender";
interface RunningFormContentProps {
  handleCloseModal: () => void
  data?: RunningFormObject | null
  onSubmit: (data: RunningFormObject) => void
}

export default function RunningFormContent({ handleCloseModal, onSubmit, data }: RunningFormContentProps) {
  const id = data?.id
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RunningForm>({
    resolver: zodResolver(RunningFormSchema),
    defaultValues: RunningFormDefaultValues,
    values: data ? DataAsRunningForm.parse(data) : undefined
  })

  const { length, startDateTime, endDateTime } = watch()
  const pace = calculatePace(length, dayjs(startDateTime).valueOf(), dayjs(endDateTime).valueOf())

  const submitAction = (data: RunningForm) => {
    const runningFormObject = RunningFormTransform.parse(data)
    onSubmit({ ...runningFormObject, id })
  }

  return <form onSubmit={handleSubmit(submitAction)}>
    <ModalHeader className="flex flex-col gap-1">
      <StateRender.Boolean
        state={data}
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
          </label>
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
        </li>
        <li>
          <label className="block text-small font-medium mb-1">
            위치<span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            isRequired
            isInvalid={!!errors.location}
            errorMessage={errors.location?.message}
            {...register('location')}
          />
        </li>
        <li>
          <label className="block text-small font-medium mb-1">
            시작 시간<span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            isRequired
            isInvalid={!!errors.startDateTime}
            errorMessage={errors.startDateTime?.message}
            {...register('startDateTime')}
          />
        </li>
        <li>
          <label className="block text-small font-medium mb-1">
            종료 시간<span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            isRequired
            isInvalid={!!errors.endDateTime}
            errorMessage={errors.endDateTime?.message}
            {...register('endDateTime')}
          />
        </li>

        <li className="col-span-2">
          <label className="block text-small font-medium mb-1">
            페이스 (분/km)
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            isDisabled
            value={String(pace)}
          />
          <p className="text-small text-default-500 mt-1">
            * 거리와 시간에 따라 자동 계산됩니다.
          </p>
        </li>

        <li className="col-span-2">
          <label className="block text-small font-medium mb-1">
            메모
          </label>
          <Textarea
            rows={3}
            isInvalid={!!errors.memo}
            errorMessage={errors.memo?.message}
            {...register('memo')}
          />
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
      <Button color="danger" variant="light" onPress={handleCloseModal}>
        취소
      </Button>
      <Button color="primary" type="submit" isLoading={isSubmitting}>
        저장
      </Button>
    </ModalFooter>
  </form>
}