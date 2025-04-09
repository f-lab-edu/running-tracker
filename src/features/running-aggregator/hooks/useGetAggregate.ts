import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCurrentWeekAggregate } from "@entities/running-aggregator/api/aggregateApi";

export default function useGetAggregate() {
  return useSuspenseQuery({
    queryKey: ['aggregate', 'weekly', 'current'],
    queryFn: fetchCurrentWeekAggregate,
  })
}