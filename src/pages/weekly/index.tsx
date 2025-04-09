import React from 'react'
import { RunningList } from '@features/running-list/ui/RunningList'
import { RunningAggregator, RunningAggregatorSkeleton } from '@features/running-aggregator'
import { AsyncBoundary } from '@shared/ui/AsyncBoundary'
import RunningListSkeleton from '@features/running-list/ui/RunningListSkeleton'
import RunningCreateFormButton from '@features/running-form/ui/RunningCreateFormButton'
import RunningModals from '@widgets/running-modals/RunningModals'
import RunningCardWithActions from '@widgets/running-card/RunningCardWithActions'
const WeeklyPage: React.FC = () => {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">주간 러닝 통계</h1>
        <RunningCreateFormButton />
      </header>

      <AsyncBoundary fallback={<RunningAggregatorSkeleton />}>
        <RunningAggregator />
      </AsyncBoundary>

      <h2 className="text-2xl font-semibold mt-8 mb-4">주간 러닝 목록</h2>

      <AsyncBoundary fallback={
        <RunningListSkeleton />
      }>
        <RunningList weekly>
          {(running) => (
            <RunningCardWithActions
              running={running}
            />
          )}
        </RunningList>
      </AsyncBoundary>
      <RunningModals />
    </section>
  )
}

export default WeeklyPage 