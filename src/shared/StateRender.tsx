import type { ReactNode } from 'react'

type KeyType = string | number
type StateRenderType = {
  [k: KeyType]: () => ReactNode
}

interface StateRenderProps<P> {
  render: P
  state: keyof P
}

interface StateRenderBooleanProps<T extends boolean> {
  state: T
  render: {
    true?: T extends true ? () => React.ReactNode : never
    false?: T extends false ? () => React.ReactNode : never
  }
}

const StateRender = <P extends StateRenderType = StateRenderType>({ render, state }: StateRenderProps<P>) => {
  if (render[state]) return <>{render[state]()}</>
  return null
}

const StateRenderBoolean = <T extends boolean>({ render, state }: StateRenderBooleanProps<T>) => {
  return <>{state ? render.true && render.true() : render.false && render.false()}</>
}

StateRender.Boolean = StateRenderBoolean

export default StateRender
