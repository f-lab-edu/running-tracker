import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchFilter } from "@featured/running-list/model/search";
import { getSearchListApi } from "@featured/running-list/api/getSearchListApi";

export default function useRunningListQuery(filter: SearchFilter) {
  return useSuspenseQuery({
    queryKey: ['running-list', filter],
    queryFn: () => getSearchListApi(filter),
  })
}