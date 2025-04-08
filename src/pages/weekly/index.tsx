import React from 'react'
import { RunningList } from '@featured/running-list/ui/RunningList'
import { RunningAggregator, RunningAggregatorSkeleton } from '@featured/running-aggregator'
import { AsyncBoundary } from '@shared/AsyncBoundary'
import RunningListSkeleton from '@featured/running-list/ui/RunningListSkeleton'
import RunningCreateFormButton from '@widget/running-form/ui/RunningCreateFormButton'

const WeeklyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">주간 러닝 통계</h1>
        <RunningCreateFormButton />
      </div>

      <AsyncBoundary fallback={<RunningAggregatorSkeleton />}>
        <RunningAggregator />
      </AsyncBoundary>

      <h2 className="text-2xl font-semibold mt-8 mb-4">주간 러닝 목록</h2>

      <AsyncBoundary fallback={
        <RunningListSkeleton />
      }>
        <RunningList weekly />
      </AsyncBoundary>
    </div>
  )
}

export default WeeklyPage 