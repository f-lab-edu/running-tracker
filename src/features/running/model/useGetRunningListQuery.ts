import { useQuery } from "@tanstack/react-query"
import { getRunningList } from "../api/apis"
import { SearchOption } from "@entities/searchOption/constant/searchOption"

export const useGetRunningListQuery = (searchOption: SearchOption) => {
  return useQuery({
    queryKey: ["running", searchOption],
    queryFn: () => getRunningList(searchOption),
  })
}
