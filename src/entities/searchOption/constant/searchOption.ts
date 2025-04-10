import { z } from "zod";

export const SearchOptionSchema = z.object({
  startTime: z.number().optional(),
  endTime: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  minDuration: z.number().optional(),
  maxDuration: z.number().optional(),
  minPace: z.number().optional(),
  maxPace: z.number().optional(),
  isAggregateOnly: z.boolean().optional(),
});

export type SearchOption = z.infer<typeof SearchOptionSchema>;