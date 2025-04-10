import { FC, ReactNode } from "react";

type KeyType = string | number
type StateRenderType = {
  [k: KeyType]: () => ReactNode
}

interface EnumRenderProps<P> {
  render: P
  state: keyof P
}

interface BooleanRenderProps {
  state: any
  render: {
    true?: () => React.ReactNode
    false?: () => React.ReactNode
  }
}

export const EnumRender = <P extends StateRenderType = StateRenderType>({
  render,
  state
}: Readonly<EnumRenderProps<P>>) => {
  return <>{render[state]?.()}</>
};

export const BooleanRender: FC<BooleanRenderProps> = ({
  render,
  state
}) => {
  return <>{state ? render.true?.() : render.false?.()}</>
};
