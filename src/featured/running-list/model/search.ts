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

export const SearchFilterSchemaAsSearchParams = SearchFilterSchema.transform((data) => {
  const searchParams = new URLSearchParams()
  if (data.minLength) searchParams.set('minLength', data.minLength.toString())
  if (data.maxLength) searchParams.set('maxLength', data.maxLength.toString())
  if (data.minTime) searchParams.set('minTime', data.minTime.toString())
  if (data.maxTime) searchParams.set('maxTime', data.maxTime.toString())
  if (data.minPace) searchParams.set('minPace', data.minPace.toString())
  if (data.maxPace) searchParams.set('maxPace', data.maxPace.toString())
  if (data.startDate) searchParams.set('startDate', data.startDate.toString())
  if (data.endDate) searchParams.set('endDate', data.endDate.toString())
  if (data.isActiveOnly) searchParams.set('isActiveOnly', data.isActiveOnly.toString())
  return searchParams
})


export const SearchFilterParamsSchema = z.object({
  minLength: z.string().optional().nullable(), // 최소 거리 (km)
  maxLength: z.string().optional().nullable(), // 최대 거리 (km)
  minTime: z.string().optional().nullable(), // 최소 시간 (초)
  maxTime: z.string().optional().nullable(), // 최대 시간 (초)
  minPace: z.string().optional().nullable(), // 최소 페이스 (min/km)
  maxPace: z.string().optional().nullable(), // 최대 페이스 (min/km)
  startDate: z.string().optional().nullable(), // 시작 날짜 (unix timestamp)
  endDate: z.string().optional().nullable(), // 종료 날짜 (unix timestamp)
  isActiveOnly: z.string().optional().nullable() // 활동 여부 필터
}).transform((data) => {
  return {
    ...data,
    minLength: data.minLength ? Number(data.minLength) : undefined,
    maxLength: data.maxLength ? Number(data.maxLength) : undefined,
    minTime: data.minTime ? Number(data.minTime) : undefined,
    maxTime: data.maxTime ? Number(data.maxTime) : undefined,
    minPace: data.minPace ? Number(data.minPace) : undefined,
    maxPace: data.maxPace ? Number(data.maxPace) : undefined,
    startDate: data.startDate ? Number(data.startDate) : undefined,
    endDate: data.endDate ? Number(data.endDate) : undefined,
    isActiveOnly: data.isActiveOnly ? Boolean(data.isActiveOnly) : undefined,
  }
})

export const searchParamsToSearchFilter = (searchParams: URLSearchParams): SearchFilter => {
  const data = Object.fromEntries(searchParams.entries())
  return SearchFilterParamsSchema.parse(data)
}
