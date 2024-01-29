import { RefObject, useEffect, useState } from 'react'

export const useFollowPointer = (ref: RefObject<HTMLElement>) => {
  const [point, setPoint] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current) return

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current

      const rect = element?.getBoundingClientRect()
      const x = clientX - rect!.x - element!.offsetWidth / 2
      const y = clientY - rect!.y - element!.offsetHeight / 2

      setPoint({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [ref])

  return point
}
