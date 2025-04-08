import { useSearchParams } from 'react-router-dom'
import dayjs from '@shared/dayjs'
import { SearchFilter, searchParamsToSearchFilter } from '@featured/running-list/model/search'

interface UseRunningFilterOptions {
  daily?: boolean
  weekly?: boolean
}

/**
 * 러닝 리스트 필터링을 위한 커스텀 훅
 */
export const useRunningFilter = ({ daily, weekly }: UseRunningFilterOptions): SearchFilter => {
  const [searchParams] = useSearchParams()
  const filter: SearchFilter = searchParamsToSearchFilter(searchParams)

  // 주간 필터: 현재 주의 시작과 끝 날짜 설정
  if (weekly) {
    const today = dayjs()
    filter.startDate = today.startOf('week').valueOf()
    filter.endDate = today.endOf('week').valueOf()
  }

  // 일간 필터: 특정 날짜 또는 오늘 날짜 설정
  if (daily) {
    const date = searchParams.get('date')
      ? dayjs(searchParams.get('date')).valueOf()
      : dayjs().valueOf()

    filter.startDate = dayjs(date).startOf('day').valueOf()
    filter.endDate = dayjs(date).endOf('day').valueOf()
  }

  return filter
} 