import { ComponentProps, ReactNode, useState } from 'react'
import styled from 'styled-components'
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

const Showcase = (
  props: Omit<ComponentProps<any>, 'refresh'> & { refresh?: boolean },
) => {
  const [count, setCount] = useState(0)

  let { refresh } = props

  return (
    <ShowcaseContainer key={count} {...props}>
      {refresh && <Refresh onClick={() => setCount(count + 1)} />}
      {props.children}
    </ShowcaseContainer>
  )
}

export default Showcase
