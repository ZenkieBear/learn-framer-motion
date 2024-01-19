import {
  ComponentProps,
  FC,
  ReactComponentElement,
  ReactNode,
  useState,
} from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Refresh } from '../Refresh/Refresh'

const ShowcaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 300px;
  padding: 10px;
  background-color: black;
  border-radius: 10px;
  gap: 10px;

  & .refresh {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`

const Showcase = (props: { refresh: boolean } & ComponentProps<any>) => {
  const [count, setCount] = useState(0)

  let { refresh, ...propsWithoutExtra } = props

  return (
    <ShowcaseContainer key={count} {...propsWithoutExtra} style={props.style}>
      {refresh && <Refresh onClick={() => setCount(count + 1)} />}
      {props.children}
    </ShowcaseContainer>
  )
}

export default Showcase
