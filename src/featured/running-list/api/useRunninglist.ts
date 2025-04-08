import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchFilter } from "../model/search";
import { fetchRunnings } from "@entities/running/api/runningApi";

export default function useRunningList(filter: SearchFilter) {
  return useSuspenseQuery({
    queryKey: ['running-list', filter],
    queryFn: () => fetchRunnings(filter),
  })
}