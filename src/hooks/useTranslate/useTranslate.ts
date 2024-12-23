import { useReducer } from 'react'
import { initialState } from './state'
import { reducer } from './reducer'
import { createActions } from './action'
export function useTranslate() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = createActions(dispatch)
  return { ...state, ...actions }
}
