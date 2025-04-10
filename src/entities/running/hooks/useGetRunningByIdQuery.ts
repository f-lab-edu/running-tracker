import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchRunningById } from "@entities/running/api";

export default function useGetRunningByIdQuery(runningId: string) {
  return useSuspenseQuery({
    queryKey: ['running', runningId],
    queryFn: () => fetchRunningById(runningId),
  })
}
