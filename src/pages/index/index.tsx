import React from 'react'
import { RunningList } from '@features/running-list/ui/RunningList'
import RunningSearchFilter from '@features/running-list/ui/RunningSearchFilter'
import RunningCreateFormButton from '@features/running-form/ui/RunningCreateFormButton'
import { AsyncBoundary } from '@shared/AsyncBoundary'
import RunningListSkeleton from '@features/running-list/ui/RunningListSkeleton'

const IndexPage: React.FC = () => {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">일간 러닝 기록</h1>
        <RunningCreateFormButton />
      </header>

      <RunningSearchFilter />

      <AsyncBoundary fallback={
        <RunningListSkeleton />
      }>
        <RunningList />
      </AsyncBoundary>
    </section>
  )
}

export default IndexPage 