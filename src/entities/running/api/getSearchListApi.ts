import api from '@shared/api'
import { Running } from '@entities/running/model'

const BASE_URL = 'runnings'

/**
 * 러닝 목록 조회
 * @param searchParams 검색 파라미터
 * @returns 러닝 목록
 */
export const getSearchListApi = async (searchParams?: URLSearchParams): Promise<Running[]> => {
  return await api.get<Running[]>(BASE_URL, { searchParams })
}