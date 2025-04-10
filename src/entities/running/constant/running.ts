import { z } from "zod";

export const RunningSchema = z.object({
  id: z.string(),
  length: z.number(),
  startTime: z.number(),
  endTime: z.number(),
  location: z.string(),
  memo: z.string(),
  isAggregate: z.boolean(),
  runningDuration: z.number(),
  pace: z.number(),
  speed: z.number(),
});

export type Running = z.infer<typeof RunningSchema>;

export const ToggleAggregatePropsSchema = z.object({
  id: z.string(),
  isAggregate: z.boolean(),
});

export type ToggleAggregateProps = z.infer<typeof ToggleAggregatePropsSchema>;
