import { http, HttpResponse, delay } from 'msw'
import { Running } from '../entities/running/model/running'
import { Aggregate } from '../featured/running-aggregator/model/aggregate'
import { v4 as uuidv4 } from 'uuid'
import dayjs from '@shared/dayjs'

// 초기 데이터
let runnings: Running[] = [
  {
    id: '1',
    length: 5.2,
    startDateTime: dayjs().subtract(1, 'day').valueOf(),
    endDateTime: dayjs().subtract(1, 'day').add(30, 'minute').valueOf(),
    pace: 6.2,
    location: '한강공원',
    memo: '오늘의 러닝',
    isAggregate: true,
  },
  {
    id: '2',
    length: 3.5,
    startDateTime: dayjs().subtract(2, 'day').valueOf(),
    endDateTime: dayjs().subtract(2, 'day').add(20, 'minute').valueOf(),
    pace: 5.8,
    location: '올림픽공원',
    memo: '가벼운 조깅',
    isAggregate: true,
  },
  {
    id: '3',
    length: 10,
    startDateTime: dayjs().subtract(5, 'day').valueOf(),
    endDateTime: dayjs().subtract(5, 'day').add(60, 'minute').valueOf(),
    pace: 6.0,
    location: '남산',
    memo: '장거리 러닝',
    isAggregate: false,
  }
]

export const handlers = [
  // 러닝 목록 조회
  http.get('/api/runnings', async ({ request }) => {
    await delay(500)
    
    const url = new URL(request.url)
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    const minLength = url.searchParams.get('minLength')
    const maxLength = url.searchParams.get('maxLength')
    const minPace = url.searchParams.get('minPace')
    const maxPace = url.searchParams.get('maxPace')
    
    let filteredData = [...runnings]
    
    if (startDate) {
      filteredData = filteredData.filter(item => item.startDateTime >= Number(startDate))
    }
    
    if (endDate) {
      filteredData = filteredData.filter(item => item.startDateTime <= Number(endDate))
    }
    
    if (minLength) {
      filteredData = filteredData.filter(item => item.length >= Number(minLength))
    }
    
    if (maxLength) {
      filteredData = filteredData.filter(item => item.length <= Number(maxLength))
    }
    
    if (minPace) {
      filteredData = filteredData.filter(item => item.pace >= Number(minPace))
    }
    
    if (maxPace) {
      filteredData = filteredData.filter(item => item.pace <= Number(maxPace))
    }
    
    return HttpResponse.json(filteredData)
  }),
  
  // 러닝 상세 조회
  http.get('/api/runnings/:id', async ({ params }) => {
    await delay(300)
    const { id } = params
    const item = runnings.find(r => r.id === id)
    
    if (!item) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(item)
  }),
  
  // 러닝 생성
  http.post('/api/runnings', async ({ request }) => {
    await delay(500)
    const data = await request.json()
    
    const newRunning: Running = {
      id: uuidv4(),
      ...data,
    }
    
    runnings.push(newRunning)
    
    return HttpResponse.json(newRunning, { status: 201 })
  }),
  
  // 러닝 수정
  http.put('/api/runnings/:id', async ({ request, params }) => {
    await delay(300)
    const { id } = params
    const data = await request.json()
    
    const index = runnings.findIndex(r => r.id === id)
    
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    runnings[index] = {
      ...runnings[index],
      ...data,
    }
    
    return HttpResponse.json(runnings[index])
  }),
  
  // 러닝 집계 토글
  http.patch('/api/runnings/:id/toggle-aggregate', async ({ params, request }) => {
    await delay(200)
    const { id } = params
    const data = await request.json()
    
    const index = runnings.findIndex(r => r.id === id)
    
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    runnings[index] = {
      ...runnings[index],
      isAggregate: data.isAggregate,
    }
    
    return HttpResponse.json(runnings[index])
  }),
  
  // 러닝 삭제
  http.delete('/api/runnings/:id', async ({ params }) => {
    await delay(300)
    const { id } = params
    
    const index = runnings.findIndex(r => r.id === id)
    
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    runnings = runnings.filter(r => r.id !== id)
    
    return new HttpResponse(null, { status: 204 })
  }),
  
  // 주간 통계 조회
  http.get('/api/aggregates/weekly', async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    
    let filteredData = [...runnings]
    
    if (startDate) {
      filteredData = filteredData.filter(item => item.startDateTime >= Number(startDate))
    }
    
    if (endDate) {
      filteredData = filteredData.filter(item => item.startDateTime <= Number(endDate))
    }
    
    // 집계 데이터만 필터링
    const aggregateData = filteredData.filter(item => item.isAggregate)
    
    // 집계 계산
    const totalRunningLength = aggregateData.reduce((sum, item) => sum + item.length, 0)
    const totalRunningTime = aggregateData.reduce((sum, item) => sum + (item.endDateTime - item.startDateTime) / 1000, 0)
    
    const aggregate: Aggregate = {
      itemsCount: aggregateData.length,
      totalRunningLength,
      totalRunningTime,
      avgRunningLength: aggregateData.length > 0 ? totalRunningLength / aggregateData.length : 0,
      avgPace: totalRunningLength > 0 ? totalRunningTime / 60 / totalRunningLength : 0,
    }
    
    return HttpResponse.json(aggregate)
  }),
] 