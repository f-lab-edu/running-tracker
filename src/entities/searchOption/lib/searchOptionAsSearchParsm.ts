import { SearchOption } from "../constant/searchOption"

export const searchOptionAsSearchParsm = (searchOption: SearchOption) => {
  const searchParams = new URLSearchParams()
  if (searchOption.minLength) searchParams.set('minLength', searchOption.minLength.toString())
  if (searchOption.maxLength) searchParams.set('maxLength', searchOption.maxLength.toString())
  if (searchOption.minDuration) searchParams.set('minDuration', searchOption.minDuration.toString())
  if (searchOption.maxDuration) searchParams.set('maxDuration', searchOption.maxDuration.toString())
  if (searchOption.minPace) searchParams.set('minPace', searchOption.minPace.toString())
  if (searchOption.maxPace) searchParams.set('maxPace', searchOption.maxPace.toString())
  if (searchOption.startTime) searchParams.set('startTime', searchOption.startTime.toString())
  if (searchOption.endTime) searchParams.set('endTime', searchOption.endTime.toString())
  if (searchOption.isAggregateOnly) searchParams.set('isAggregateOnly', searchOption.isAggregateOnly.toString())
  return searchParams
}
