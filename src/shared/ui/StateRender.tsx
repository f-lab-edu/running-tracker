import type { FC, ReactNode } from 'react'

type KeyType = string | number
type StateRenderType = {
  [k: KeyType]: () => ReactNode
}

interface StateRenderProps<P> {
  render: P
  state: keyof P
}

interface StateRenderBooleanProps {
  state: any
  render: {
    true?: () => React.ReactNode
    false?: () => React.ReactNode
  }
}

const StateRender = <P extends StateRenderType = StateRenderType>({ render, state }: Readonly<StateRenderProps<P>>) => {
  return <>{render[state]?.()}</>
}

const StateRenderBoolean: FC<StateRenderBooleanProps> = ({ render, state }) => {
  return <>{state ? render.true?.() : render.false?.()}</>
}

StateRender.Boolean = StateRenderBoolean

export default StateRender
