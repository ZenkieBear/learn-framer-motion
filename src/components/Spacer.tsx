import React from 'react'

const Spacer = ({
  size = 'small',
}: {
  size?: number | 'small' | 'middle' | 'large'
}) => {
  if (size === 'small') return <div style={{ height: 20 }} />
  if (size === 'middle') return <div style={{ height: 60 }} />
  if (size === 'large') return <div style={{ height: 80 }} />
  return <div style={{ height: size }} />
}

export default Spacer
