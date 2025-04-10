import { RunningSchema } from '@entities/running/constant/running'
import dayjs from '@shared/lib/dayjs'
import { getPace } from '@shared/lib/transfomer'
import { z } from 'zod'

export const RunningCreateSchema = RunningSchema.omit({ id: true }).extend({
  id: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
})


export const RunningFormDefaultValues = RunningCreateSchema.parse({
  length: 0,
  startTime: dayjs().subtract(1, 'hour').toISOString().substring(0, 16),
  endTime: dayjs().toISOString().substring(0, 16),
  pace: 0,
  location: '',
  memo: '',
  isAggregate: false,
})

export const RunningFormSchema = RunningCreateSchema.refine(
  (data) => dayjs(data.startTime).isBefore(dayjs(data.endTime)),
  {
    message: '종료 시간은 시작 시간보다 늦어야 합니다',
    path: ['endTime']
  }
)

export const RunningAsFormData = RunningCreateSchema.transform(data => {
  const length = data.length
  const startTime = dayjs(data.startTime).valueOf()
  const endTime = dayjs(data.endTime).valueOf()
  const pace = getPace(length, endTime - startTime)
  return { ...data, startTime, endTime, pace }
})

export const FormDataAsRunning = RunningSchema.transform(data => {
  const startTime = dayjs(data.startTime).toISOString().substring(0, 16)
  const endTime = dayjs(data.endTime).toISOString().substring(0, 16)
  return { ...data, startTime, endTime }
})
export type RunningForm = z.infer<typeof RunningCreateSchema>
export type RunningFormResult = z.infer<typeof RunningAsFormData>