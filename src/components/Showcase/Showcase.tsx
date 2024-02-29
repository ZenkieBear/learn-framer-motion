import {
  ComponentProps,
  FC,
  ReactComponentElement,
  ReactNode,
  RefObject,
  useState,
} from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Refresh } from '../Refresh/Refresh'

const ShowcaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  width: 100%;
  height: 300px;
  padding: 10px;
  background-color: black;
  border-radius: 10px;
  color: white;

  & .refresh {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`

const Showcase = (props: {
  containerRef?: RefObject<HTMLDivElement>
  style?: CSSProperties
  refresh?: boolean
  children?: ReactNode
}) => {
  const [count, setCount] = useState(0)

  let { refresh = false, containerRef, ...propsWithoutExtra } = props

  return (
    <ShowcaseContainer
      key={count}
      ref={props.containerRef}
      {...propsWithoutExtra}
    >
      {refresh && <Refresh onClick={() => setCount(count + 1)} />}
      {props.children}
    </ShowcaseContainer>
  )
}

export default Showcase
