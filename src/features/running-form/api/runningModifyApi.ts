import { Running } from "@entities/running/model/running"
import api from "@shared/api"
import { RunningFormObject } from "@features/running-form/model/runningForm"
const BASE_URL = 'runnings'

/**
 * 러닝 수정
 * @param id 러닝 ID
 * @param data 수정할 러닝 데이터
 * @returns 수정된 러닝 정보
 */
export const updateRunning = async (id: string, data: RunningFormObject): Promise<Running> => {
  return await api.put<Running>(`${BASE_URL}/${id}`, { json: data })
}