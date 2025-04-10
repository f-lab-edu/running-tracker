import { z } from "zod";

export const AggregateSchema = z.object({
  totalLength: z.number(),
  totalTime: z.number(),
  runningItemCount: z.number(),
});

export type Aggregate = z.infer<typeof AggregateSchema>;
