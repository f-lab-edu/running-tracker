import { z } from 'zod'

// 집계 스키마 정의
export const AggregateSchema = z.object({
  itemsCount: z.number(), // 집계된 아이템 수
  totalRunningLength: z.number(), // 총 러닝 거리 (km)
  totalRunningTime: z.number(), // 총 러닝 시간 (초)
  avgRunningLength: z.number().optional(), // 평균 러닝 거리 (km)
  avgPace: z.number().optional(), // 평균 페이스 (min/km)
})

export type Aggregate = z.infer<typeof AggregateSchema> 