import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchFilter } from "@features/running-list/model/search";
import { getSearchListApi } from "@features/running-list/api/getSearchListApi";

export default function useRunningListQuery(filter: SearchFilter) {
  return useSuspenseQuery({
    queryKey: ['running-list', filter],
    queryFn: () => getSearchListApi(filter),
  })
}