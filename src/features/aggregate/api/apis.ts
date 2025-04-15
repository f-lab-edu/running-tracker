import { Aggregate } from "@entities/aggregate/constant/aggregate"
import { SearchOption } from "@entities/searchOption/constant/searchOption"
import { searchOptionAsSearchParsm } from "@entities/searchOption/lib/searchOptionAsSearchParsm"
import api from "@shared/lib/api"

export const getAggregate = (searchOption: SearchOption) => {
  return api.get<Aggregate>("aggregate", {
    searchParams: searchOptionAsSearchParsm(searchOption)
  })
}

