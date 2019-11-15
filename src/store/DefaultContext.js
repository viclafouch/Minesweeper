import React, { createContext, useReducer, useEffect } from 'react'
import DefaultReducer from './reducer/default'

export const DefaultContext = createContext()

export function DefaultProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(DefaultReducer, { ...initialState })
  const { isVolumeEnabled } = state

  useEffect(() => {
    localStorage.setItem('isVolumeEnabled', isVolumeEnabled)
  }, [isVolumeEnabled])

  return <DefaultContext.Provider value={[state, dispatch]}>{children}</DefaultContext.Provider>
}
