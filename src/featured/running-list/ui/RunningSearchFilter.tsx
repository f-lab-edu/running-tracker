import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Button,
  Divider,
  Tooltip,
  Accordion,
  AccordionItem,
  Checkbox
} from '@heroui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiFilter, FiRefreshCw } from 'react-icons/fi'
import { SearchFilter, SearchFilterSchema, SearchFilterSchemaAsSearchParams, searchParamsToSearchFilter } from '../model/search'
import StateRender from '@shared/StateRender'

const defaultFilter: SearchFilter = {
  minLength: null,
  maxLength: null,
  minTime: null,
  maxTime: null,
  minPace: null,
  maxPace: null,
  isActiveOnly: false
}

type FilterState = '11' | '10' | '01' | '00'

const RunningSearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // react-hook-form 설정
  const {
    handleSubmit,
    register,
    reset,
    watch
  } = useForm<SearchFilter>({
    resolver: zodResolver(SearchFilterSchema),
    defaultValues: defaultFilter,
    values: searchParamsToSearchFilter(searchParams),
  })

  // 필터 값 감지
  const filterValues = watch()
  const isFilterApplied = Object.entries(filterValues).some(([key, value]) => {
    if (key === 'isActiveOnly') return value === true
    return value !== null
  })

  // 필터 적용
  const onSubmit: SubmitHandler<SearchFilter> = (data) => {
    setSearchParams(SearchFilterSchemaAsSearchParams.parse(data))
  }

  // 필터 초기화
  const handleReset = () => {
    reset(defaultFilter)
    setSearchParams(SearchFilterSchemaAsSearchParams.parse(defaultFilter))
  }


  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <FiFilter />
          <h3 className="text-base font-semibold">러닝 기록 필터</h3>
          {isFilterApplied && (
            <Tooltip content="필터가 적용되었습니다">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
            </Tooltip>
          )}
        </div>
        <Button
          size="sm"
          variant="light"
          onPress={() => setIsFilterExpanded(!isFilterExpanded)}
        >
          <StateRender.Boolean
            state={isFilterExpanded}
            render={{
              true: () => '접기',
              false: () => '필터 설정'
            }}
          />
        </Button>
      </CardHeader>

      <Divider />

      <CardBody className={isFilterExpanded ? 'block' : 'hidden'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Accordion>
            <AccordionItem
              key="distance"
              title="거리 (km)"
              subtitle="러닝 거리 범위로 필터링"
              startContent={
                <span className="text-small text-primary">
                  <StateRender
                    state={(filterValues.minLength ? '1' : '0') + (filterValues.maxLength ? '1' : '0') as FilterState}
                    render={{
                      '11': () => `${filterValues.minLength} - ${filterValues.maxLength} km`,
                      '10': () => `최소 ${filterValues.minLength} km`,
                      '01': () => `최대 ${filterValues.maxLength} km`,
                      '00': () => '모든 거리'
                    }}
                  />
                </span>
              }
            >
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="최소"
                  size="sm"
                  startContent={<span className="text-small text-default-400">최소</span>}
                  {...register('minLength', {
                    valueAsNumber: true
                  })}
                />
                <span>~</span>
                <Input
                  placeholder="최대"
                  size="sm"
                  startContent={<span className="text-small text-default-400">최대</span>}
                  {...register('maxLength', {
                    valueAsNumber: true
                  })}
                />
              </div>
            </AccordionItem>

            <AccordionItem
              key="time"
              title="시간 (분)"
              subtitle="러닝 소요 시간 범위로 필터링"
              startContent={
                <span className="text-small text-primary">
                  <StateRender
                    state={(filterValues.minTime ? '1' : '0') + (filterValues.maxTime ? '1' : '0') as FilterState}
                    render={{
                      '11': () => `${filterValues.minTime || 0} - ${filterValues.maxTime || 0} 분`,
                      '10': () => `최소 ${filterValues.minTime || 0} 분`,
                      '01': () => `최대 ${filterValues.maxTime || 0} 분`,
                      '00': () => '모든 시간'
                    }}
                  />
                </span>
              }
            >
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="최소"
                  size="sm"
                  startContent={<span className="text-small text-default-400">최소</span>}
                  {...register('minTime', {
                    valueAsNumber: true
                  })}
                />
                <span>~</span>
                <Input
                  type="number"
                  placeholder="최대"
                  size="sm"
                  startContent={<span className="text-small text-default-400">최대</span>}
                  {...register('maxTime', {
                    valueAsNumber: true
                  })}
                />
              </div>
            </AccordionItem>

            <AccordionItem
              key="pace"
              title="페이스 (분/km)"
              subtitle="러닝 페이스 범위로 필터링"
              startContent={
                <span className="text-small text-primary">
                  <StateRender
                    state={(filterValues.minPace ? '1' : '0') + (filterValues.maxPace ? '1' : '0') as FilterState}
                    render={{
                      '11': () => `${filterValues.minPace} - ${filterValues.maxPace} 분/km`,
                      '10': () => `최소 ${filterValues.minPace} 분/km`,
                      '01': () => `최대 ${filterValues.maxPace} 분/km`,
                      '00': () => '모든 페이스'
                    }}
                  />
                </span>
              }
            >
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="최소"
                  size="sm"
                  startContent={<span className="text-small text-default-400">최소</span>}
                  {...register('minPace', {
                    valueAsNumber: true
                  })}
                />
                <span>~</span>
                <Input
                  type="number"
                  placeholder="최대"
                  size="sm"
                  startContent={<span className="text-small text-default-400">최대</span>}
                  {...register('maxPace', {
                    valueAsNumber: true
                  })}
                />
              </div>
            </AccordionItem>
          </Accordion>

          <div className="mt-4">
            <Checkbox
              {...register('isActiveOnly', {
                setValueAs(value) {
                  return value === 'true'
                }
              })}
            >
              집계에 포함된 기록만 보기
            </Checkbox>
          </div>

          <Divider className="my-4" />

          <div className="flex justify-end gap-2">
            <Button
              color="danger"
              variant="light"
              type="button"
              onPress={handleReset}
              startContent={<FiRefreshCw size={16} />}
              isDisabled={!isFilterApplied}
            >
              초기화
            </Button>
            <Button
              color="primary"
              type="submit"
              startContent={<FiFilter size={16} />}
            >
              필터 적용
            </Button>
          </div>
        </form>
      </CardBody>

      <StateRender.Boolean
        state={isFilterExpanded && isFilterApplied}
        render={{
          true: () => (
            <CardFooter className="flex justify-between items-center py-2">
              <div className="text-small text-default-500">
                필터가 적용되었습니다
              </div>
              <Button
                size="sm"
                color="danger"
                variant="light"
                startContent={<FiRefreshCw size={14} />}
                onPress={handleReset}
              >
                초기화
              </Button>
            </CardFooter>
          )
        }}
      />
    </Card>
  )
}

export default RunningSearchFilter 