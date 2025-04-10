import { useSuspenseQuery } from "@tanstack/react-query"
import { getAggregate } from "../api/apis"
import { SearchOption } from "@entities/searchOption/constant/searchOption"

export const useGetAggregate = (searchOption: SearchOption) => {
  return useSuspenseQuery({
    queryKey: ['aggregate', searchOption],
    queryFn: () => getAggregate(searchOption)
  })
}
