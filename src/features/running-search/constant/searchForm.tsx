import { SearchOptionSchema } from "@entities/searchOption/constant/searchOption"

export const SearchFilterRule = SearchOptionSchema.refine((data) => {
  if (data.minLength && data.maxLength && data.minLength > data.maxLength) {
    return false
  }
  return true
}, {
  message: '최소 거리는 최대 거리보다 작아야 합니다.',
  path: ['minLength', 'maxLength']
}).refine((data) => {
  if (data.minDuration && data.maxDuration && data.minDuration > data.maxDuration) {
    return false
  }
  return true
}, {
  message: '최소 시간은 최대 시간보다 작아야 합니다.',
  path: ['minDuration', 'maxDuration']
}).refine((data) => {
  if (data.minPace && data.maxPace && data.minPace > data.maxPace) {
    return false
  }
  return true
}, {
  message: '최소 페이스는 최대 페이스보다 작아야 합니다.',
  path: ['minPace', 'maxPace']
})