import { useSuspenseQuery } from "@tanstack/react-query"
import { getRunning as getRunningApi } from "../api/apis"

export default function useGetRunningQuery(id: string) {
  return useSuspenseQuery({
    queryKey: ["running", id],
    queryFn: () => getRunningApi(id),
  })
}