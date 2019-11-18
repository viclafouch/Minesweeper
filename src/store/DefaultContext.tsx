import * as React from 'react'
import { useReducer, createContext, useEffect } from 'react'
import DefaultReducer from './reducer/default'

export const DefaultContext = createContext<any>({} as any);

export function DefaultProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(DefaultReducer, { ...initialState })
  const { isVolumeEnabled } = state

  useEffect(() => {
    localStorage.isVolumeEnabled = isVolumeEnabled
  }, [isVolumeEnabled])

  return <DefaultContext.Provider value={[state, dispatch]}>{children}</DefaultContext.Provider>
}
