import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCurrentWeekAggregate } from "@features/running-aggregator/api/aggregateApi";

export default function useGetAggregateQuery() {
  return useSuspenseQuery({
    queryKey: ['aggregate', 'weekly', 'current'],
    queryFn: fetchCurrentWeekAggregate,
  })
}