import { z } from 'zod'

// Running 엔티티 스키마 정의
export const RunningSchema = z.object({
  id: z.string(),
  length: z.number(), // 거리 (km)
  startDateTime: z.number(), // 시작 시간 (unix timestamp)
  endDateTime: z.number(), // 종료 시간 (unix timestamp)
  pace: z.number(), // 페이스 (min/km)
  location: z.string(), // 위치
  memo: z.string().optional(), // 메모
  isAggregate: z.boolean(), // 집계 여부
})

export type Running = z.infer<typeof RunningSchema>

// 생성 스키마 (id 제외)
export const RunningCreateSchema = RunningSchema.omit({ id: true })
export type RunningCreate = z.infer<typeof RunningCreateSchema>

// 수정 스키마 (부분 업데이트 가능)
export const RunningUpdateSchema = RunningSchema.partial().extend({
  id: z.string(),
})
export type RunningUpdate = z.infer<typeof RunningUpdateSchema>

// 집계 토글 스키마
export const RunningToggleSchema = z.object({
  id: z.string(),
  isAggregate: z.boolean(),
})
export type RunningToggle = z.infer<typeof RunningToggleSchema> 