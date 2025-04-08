import api from '@shared/api'
import { Running } from '@entities/running/model/running'
import { SearchFilter, SearchFilterSchemaAsSearchParams } from '@features/running-list/model/search'

const BASE_URL = 'runnings'

/**
 * 러닝 목록 조회
 * @param filter 검색 필터
 * @returns 러닝 목록
 */
export const getSearchListApi = async (filter?: SearchFilter): Promise<Running[]> => {
  const searchParams = SearchFilterSchemaAsSearchParams.parse(filter)
  return await api.get<Running[]>(BASE_URL, { searchParams })
}