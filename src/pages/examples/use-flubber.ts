import {  MotionValue, progress, useTransform } from "framer-motion";
import { interpolate } from 'flubber';

export const getIndex = (_: any, index: number) => index;
export const useFlubber = (progress: MotionValue<number>, paths: string[]) => {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 })
  })
}
