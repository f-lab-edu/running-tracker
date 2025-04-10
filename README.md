- 일간 러닝 기록 목록 페이지
    - 목록은 러닝 카드 형태(거리, 시간, 페이스, 장소, 메모, 집계여부 표시)
- 기록 상세 페이지
    - 카드 클릭 시 상세 모달 열기
    - 거리, 시간, 페이스, 경로(naver map url 혹은 Strava 등), 메모 등 전체 정보 표시
    - 체크박스로 통계 제외/포함 조작 가능
- 목록 페이지에 러닝 기록 필터 추가하기
    - 3가지 필터: 거리, 시간, 페이스 조건(ex: 5km 이상, 30분 미만)
    - 필터는 URL query string 기반
- 주간 통계 요약
    - 집계 대상만 포함
    - 총 거리, 평균 거리, 총 시간, 평균 페이스
- 한 항목에서 집계 제외 토글 기능
    - 집계 포함 여부 put api 활용
    - UI/요약 통계에 실시간 반영되어야 함
- 월간 러닝 달력 페이지
    - 캘린더 관련 라이브러리 사용 가능

object structur
- running class
  - length: number(m)
  - startTime: number(second)
  - endTime: number(second)
  - location: string(url)
  - memo: string
  - isAggregate: boolean
  - getter runningDuration: endTime - startTime
  - getter pace: calculated by transformer
  - getter speed: calculated by transformer

aggregate object
- totalLength: number(m)
- totalTime: number(second)
- runningItemCount: number

searchOption object
- startTime?: number
- endTime?: number
- minLength?: number
- maxLength?: number
- minDuration?: number
- maxDuration?: number
- minPace?: number
- maxPace?: number
- isAggregateOnly?: boolean

directory rule - follow fsd
- src
  - shared
    - ui
      - async boundary
      - enum render, boolean render
      - default error content
    - lib
      - dayjs + duration plugin
      - formatter ()
      - transfomer (km/h, pace)
      - queryClient
    - api
      - ky configrate as api
  - entities
    - aggregate
      - constant
        - aggregate
      - ui
        - aggregate
    - running
      - constant
        - running
      - ui & skeletons
        - card
        - list
        - detail
    - search option
      - constant
        - search option
      - lib
        - searchParamAsSearchOption
        - searchOptionAsSearchParam
  - features
    - running
      - api
        - create, get, update, delete, toggle
      - ui
        - detail
        - form
    - running list
      - api
        - get running list by filter
      - ui
        - search result list - use async boundary
          - props: runningList, searchOption
    - running search
      - lib
        - validator
      - ui
        - minmax input field
        - minmax humanizer
        - search input form
    - aggregate
      - api
        - get aggregate by start date & end date
      - ui & skeletons
        - aggregator
  - widgets
    - ListWithFilter
      - ui
        - search result list & search form
    - calender & list & search
      - ui
        - search result list & search form
    - running modal (detail, modify, create)
      - model
        - state (jotai)
      - ui
        - running modal
  - pages
    - index - today list
    - weekly - weekly aggregate list
    - calender - calender & selected date list
  - app
    - styles
    - app
    - layouts
    - route


