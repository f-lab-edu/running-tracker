import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchFilter, SearchFilterSchemaAsSearchParams } from "@features/running-list/model/search";
import { getSearchListApi } from "@entities/running/api/getSearchListApi";

export default function useRunningListQuery(filter: SearchFilter) {
  return useSuspenseQuery({
    queryKey: ['running-list', filter],
    queryFn: () => {
      const searchParams = SearchFilterSchemaAsSearchParams.parse(filter)
      return getSearchListApi(searchParams)
    }
  })
}