import React from 'react'

export const useCenteredTree = ((defaultTranslate = { x: 0, y: 0 }) => {
   const [translate, setTranslate] = React.useState(defaultTranslate)
   const containerRef: any = React.useCallback((elem: any): void => {
      if (elem !== null) {
         const { width, height } = elem.getBoundingClientRect()
         setTranslate({ x: width / 2, y: height / 14 })
      }
   }, [])
   return [translate, containerRef]
})