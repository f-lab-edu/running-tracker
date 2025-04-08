import api from '@shared/api'
import { Running } from '../model/running'

const BASE_URL = 'runnings'

/**
 * 특정 러닝 조회
 * @param id 러닝 ID
 * @returns 러닝 정보
 */
export const fetchRunningById = async (id: string): Promise<Running> => {
  return await api.get<Running>(`${BASE_URL}/${id}`)
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