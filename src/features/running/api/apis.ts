import { Running } from "@entities/running/constant/running"
import { SearchOption } from "@entities/searchOption/constant/searchOption"
import { searchOptionAsSearchParsm } from "@entities/searchOption/lib/searchOptionAsSearchParsm"
import api from "@shared/lib/api"

export const getRunningList = (searchOption: SearchOption) => {
  const searchParams = searchOptionAsSearchParsm(searchOption)
  return api.get<Running[]>("/api/running", {
    searchParams: searchParams
  })
}

export const getRunning = (id: string) => {
  return api.get<Running>(`/api/running/${id}`)
}

export const createRunning = (running: Omit<Running, 'id'>) => {
  return api.post<Running>("/api/running", {
    json: running
  })
}

export const updateRunning = (running: Running) => {
  return api.put<Running>(`/api/running/${running.id}`, {
    json: running
  })
}

export const deleteRunning = (id: string) => {
  return api.delete(`/api/running/${id}`)
}

export const toggleAggregateRunning = (id: string, isAggregate: boolean) => {
  return api.put<Running>(`/api/running/${id}/aggregate`, {
    json: { isAggregate }
  })
}
