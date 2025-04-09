import React from 'react'
import RunningCreateFormButton from '@features/running-form/ui/RunningCreateFormButton'
import RunningModals from '@widgets/running-modals/RunningModals'
import RunningCardWithActions from '@widgets/running-card/RunningCardWithActions'
import AsyncRunningAggregator from '@features/running-aggregator/ui/AsyncRunningAggregator'
import AsyncRunningList from '@features/running-list/ui/AsyncRunningList'
const WeeklyPage: React.FC = () => {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">주간 러닝 통계</h1>
        <RunningCreateFormButton />
      </header>

      <AsyncRunningAggregator />

      <h2 className="text-2xl font-semibold mt-8 mb-4">주간 러닝 목록</h2>

      <AsyncRunningList weekly>
        {(running) => (
          <RunningCardWithActions
            running={running}
          />
        )}
      </AsyncRunningList  >
      <RunningModals />
    </section>
  )
}

export default WeeklyPage 