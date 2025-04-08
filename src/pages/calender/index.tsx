import React, { useState } from 'react'
import { RunningList } from '@featured/running-list/ui/RunningList'
import { Calendar } from '@heroui/react'
import dayjs from '@shared/dayjs'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { parseDate, today, CalendarDate } from '@internationalized/date'
import RunningListSkeleton from '@featured/running-list/ui/RunningListSkeleton'
import { AsyncBoundary } from '@shared/AsyncBoundary'

const CalenderPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const dateParam = searchParams.get('date')

  const [selectedDate, setSelectedDate] = useState<CalendarDate>(dateParam ? parseDate(dateParam) : today('Asia/Seoul'))

  // 날짜 선택
  const handleSelectDate = (date: CalendarDate) => {
    setSelectedDate(date)
    navigate(`/calender?date=${date.toString()}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">월간 러닝 캘린더</h1>

      <Calendar
        value={selectedDate}
        onChange={handleSelectDate}
      />

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        {dayjs(selectedDate.toString()).format('YYYY년 MM월 DD일')} 러닝 목록
      </h2>

      <AsyncBoundary fallback={
        <RunningListSkeleton />
      }>
        <RunningList daily />
      </AsyncBoundary>
    </div>
  )
}

export default CalenderPage 