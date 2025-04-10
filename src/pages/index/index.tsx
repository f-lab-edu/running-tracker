import React from 'react'
import RunningSearchFilter from '@features/running-list/ui/RunningSearchFilter'
import RunningCreateFormButton from '@features/running-form/ui/RunningCreateFormButton'
import RunningModals from '@widgets/running-modals/RunningModals'
import RunningCardWithActions from '@widgets/running-card/RunningCardWithActions'
import AsyncRunningList from '@features/running-list/ui/AsyncRunningList'
const IndexPage: React.FC = () => {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">일간 러닝 기록</h1>
        <RunningCreateFormButton />
      </header>

      <RunningSearchFilter />

      <AsyncRunningList>
        {(running) => (
          <RunningCardWithActions
            running={running}
          />
        )}
      </AsyncRunningList>
      <RunningModals />
    </section>
  )
}

export default IndexPage 