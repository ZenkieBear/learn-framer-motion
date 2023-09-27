import { ReactNode } from 'react'
import styled from 'styled-components'

interface RangeProps {
  children: ReactNode
  value: number
  set: (newValue: number) => void
  min?: number
  max?: number
}

const RangeLabel = styled.label`
  display: flex;
  width: 100%;
  height: 2em;
  padding: 0.5em;
  justify-content: center;
`
export function Range({
  children,
  value,
  set,
  min = -200,
  max = 200,
}: RangeProps) {
  return (
    <RangeLabel>
      <code style={{ width: 80, color: 'white', fontSize: 18 }}>
        {children}
      </code>
      <input
        type='range'
        value={value}
        max={max}
        min={min}
        onChange={e => set(parseFloat(e.target.value))}
      />
      <input
        type='number'
        value={value}
        max={max}
        min={min}
        onChange={e => set(parseFloat(e.target.value))}
      />
    </RangeLabel>
  )
}
