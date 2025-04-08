import { Aggregate } from '@featured/running-aggregator/model/aggregate'
import dayjs from '@shared/dayjs'
import api from '@shared/api'

const BASE_URL = 'aggregates/weekly'

/**
 * 주간 러닝 통계 조회
 * @param startDate 시작 날짜 (타임스탬프)
 * @param endDate 종료 날짜 (타임스탬프)
 * @returns 집계 정보
 */
export const fetchWeeklyAggregate = async (startDate?: number, endDate?: number): Promise<Aggregate> => {
  const params = new URLSearchParams()

  if (startDate) {
    params.append('startDate', startDate.toString())
  }

  if (endDate) {
    params.append('endDate', endDate.toString())
  }

  return await api.get<Aggregate>(BASE_URL, {
    searchParams: params
  })
}

/**
 * 현재 주간 통계 조회 (일요일부터 토요일까지)
 * @returns 현재 주간 집계 정보
 */
export const fetchCurrentWeekAggregate = async (): Promise<Aggregate> => {
  const today = dayjs()
  const startOfWeek = today.startOf('week').valueOf()
  const endOfWeek = today.endOf('week').valueOf()

  return fetchWeeklyAggregate(startOfWeek, endOfWeek)
} 