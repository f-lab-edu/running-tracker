import { Running } from "@entities/running/model/running"
import api from "@shared/api"
import { RunningFormObject } from "@widget/running-form/model/runningForm"

const BASE_URL = 'runnings'

/**
 * 러닝 생성
 * @param data 생성할 러닝 데이터
 * @returns 생성된 러닝 정보
 */
export const createRunning = async (data: RunningFormObject): Promise<Running> => {
  return await api.post<Running>(BASE_URL, { json: data })
}
