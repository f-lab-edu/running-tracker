import { RunningSchema } from '@entities/running/model'
import dayjs from '@shared/lib/dayjs'
import { calculatePace } from '@shared/lib/formatters'
import { z } from 'zod'

export const RunningCreateSchema = RunningSchema.omit({ id: true }).extend({
  startDateTime: z.string(),
  endDateTime: z.string(),
})


export const RunningFormDefaultValues = RunningCreateSchema.parse({
  length: 0,
  startDateTime: dayjs().subtract(1, 'hour').toISOString().substring(0, 16),
  endDateTime: dayjs().toISOString().substring(0, 16),
  pace: 0,
  location: '',
  memo: '',
  isAggregate: false,
})

export const RunningFormSchema = RunningCreateSchema.refine(
  (data) => dayjs(data.startDateTime).isBefore(dayjs(data.endDateTime)),
  {
    message: '종료 시간은 시작 시간보다 늦어야 합니다',
    path: ['endDateTime']
  }
)

export const RunningFormTransform = RunningCreateSchema.extend({
  id: z.string().optional(),
}).transform(data => {
  const length = data.length
  const startDateTime = dayjs(data.startDateTime).valueOf()
  const endDateTime = dayjs(data.endDateTime).valueOf()
  const pace = calculatePace(length, startDateTime, endDateTime)
  return { ...data, startDateTime, endDateTime, pace }
})

export const DataAsRunningForm = RunningSchema.transform(data => {
  const startDateTime = dayjs(data.startDateTime).toISOString().substring(0, 16)
  const endDateTime = dayjs(data.endDateTime).toISOString().substring(0, 16)
  return { ...data, startDateTime, endDateTime }
})
export type RunningForm = z.infer<typeof RunningCreateSchema>
export type RunningFormObject = z.infer<typeof RunningFormTransform>
