import api from '@shared/api'
import { Running, RunningCreate, RunningUpdate } from '../model/running'
import { SearchFilter, SearchFilterSchemaAsSearchParams } from '@featured/running-list/model/search'

const BASE_URL = 'runnings'

/**
 * 러닝 목록 조회
 * @param filter 검색 필터
 * @returns 러닝 목록
 */
export const fetchRunnings = async (filter?: SearchFilter): Promise<Running[]> => {
  const searchParams = SearchFilterSchemaAsSearchParams.parse(filter)
  return await api.get<Running[]>(BASE_URL, { searchParams })
}

/**
 * 특정 러닝 조회
 * @param id 러닝 ID
 * @returns 러닝 정보
 */
export const fetchRunningById = async (id: string): Promise<Running> => {
  return await api.get<Running>(`${BASE_URL}/${id}`)
}

/**
 * 러닝 생성
 * @param data 생성할 러닝 데이터
 * @returns 생성된 러닝 정보
 */
export const createRunning = async (data: RunningCreate): Promise<Running> => {
  return await api.post<Running>(BASE_URL, { json: data })
}

/**
 * 러닝 수정
 * @param id 러닝 ID
 * @param data 수정할 러닝 데이터
 * @returns 수정된 러닝 정보
 */
export const updateRunning = async (id: string, data: RunningUpdate): Promise<Running> => {
  return await api.put<Running>(`${BASE_URL}/${id}`, { json: data })
}

/**
 * 러닝 집계 상태 토글
 * @param id 러닝 ID
 * @param isAggregate 집계 여부
 * @returns 수정된 러닝 정보
 */
export const toggleRunningAggregate = async (id: string, isAggregate: boolean): Promise<Running> => {
  return await api
    .patch<Running>(`${BASE_URL}/${id}/toggle-aggregate`, {
      json: { isAggregate }
    })
}

/**
 * 러닝 삭제
 * @param id 러닝 ID
 */
export const deleteRunning = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`)
} 