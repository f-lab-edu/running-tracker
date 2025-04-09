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
