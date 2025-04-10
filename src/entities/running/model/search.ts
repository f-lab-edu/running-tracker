import { z } from 'zod'

// 검색 필터 스키마 정의
export const SearchFilterSchema = z.object({
  minLength: z.number().optional().nullable(), // 최소 거리 (km)
  maxLength: z.number().optional().nullable(), // 최대 거리 (km)
  minTime: z.number().optional().nullable(), // 최소 시간 (초)
  maxTime: z.number().optional().nullable(), // 최대 시간 (초)
  minPace: z.number().optional().nullable(), // 최소 페이스 (min/km)
  maxPace: z.number().optional().nullable(), // 최대 페이스 (min/km)
  startDate: z.number().optional().nullable(), // 시작 날짜 (unix timestamp)
  endDate: z.number().optional().nullable(), // 종료 날짜 (unix timestamp)
  isActiveOnly: z.boolean().optional().nullable() // 활동 여부 필터
})

export type SearchFilter = z.infer<typeof SearchFilterSchema>