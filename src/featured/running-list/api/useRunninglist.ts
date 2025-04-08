import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchFilter } from "../model/search";
import { getSearchListApi } from "@featured/running-list/api/getSearchListApi";

export default function useRunningList(filter: SearchFilter) {
  return useSuspenseQuery({
    queryKey: ['running-list', filter],
    queryFn: () => getSearchListApi(filter),
  })
}