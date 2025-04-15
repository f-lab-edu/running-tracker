import { useSuspenseQuery } from "@tanstack/react-query"
import { getRunningList } from "../api/apis"
import { SearchOption } from "@entities/searchOption/constant/searchOption"

export const useGetRunningListQuery = (searchOption: SearchOption) => {
  return useSuspenseQuery({
    queryKey: ["running", 'list', searchOption],
    queryFn: () => getRunningList(searchOption),
  })
}
