import { z } from "zod"
import { SearchOption } from "../constant/searchOption"

export const SearchFilterParamsSchema = z.object({
  minLength: z.string().optional().nullable(), // 최소 거리 (km)
  maxLength: z.string().optional().nullable(), // 최대 거리 (km)
  minDuration: z.string().optional().nullable(), // 최소 시간 (초)
  maxDuration: z.string().optional().nullable(), // 최대 시간 (초)
  minPace: z.string().optional().nullable(), // 최소 페이스 (min/km)
  maxPace: z.string().optional().nullable(), // 최대 페이스 (min/km)
  startTime: z.string().optional().nullable(), // 시작 시간 (unix timestamp)
  endTime: z.string().optional().nullable(), // 종료 시간 (unix timestamp)
  isAggregateOnly: z.string().optional().nullable() // 집계 여부 필터
}).transform<SearchOption>((data) => {
  return {
    ...data,
    minLength: data.minLength ? Number(data.minLength) : undefined,
    maxLength: data.maxLength ? Number(data.maxLength) : undefined,
    minDuration: data.minDuration ? Number(data.minDuration) : undefined,
    maxDuration: data.maxDuration ? Number(data.maxDuration) : undefined,
    minPace: data.minPace ? Number(data.minPace) : undefined,
    maxPace: data.maxPace ? Number(data.maxPace) : undefined,
    startTime: data.startTime ? Number(data.startTime) : undefined,
    endTime: data.endTime ? Number(data.endTime) : undefined,
    isAggregateOnly: data.isAggregateOnly ? Boolean(data.isAggregateOnly) : undefined,
  }
})

export const searchParamsToSearchFilter = (searchParams: URLSearchParams): SearchOption => {
  const data = Object.fromEntries(searchParams.entries())
  return SearchFilterParamsSchema.parse(data)
}