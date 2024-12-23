import { AUTO_LANGUAGE } from '../../constants'
import { type State, type Action } from '../../types.d'
export function reducer(state: State, action: Action): State {
  const loading = state.fromText !== ''
  switch (action.type) {
    case 'INTERCHANGE_LANGUAGES':
      if (state.fromLanguage === AUTO_LANGUAGE) return state
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.translation,
        translation: '',
        loading,
      }
    case 'SET_FROM_LANGUAGE':
      return { ...state, fromLanguage: action.payload, loading }
    case 'SET_TO_LANGUAGE':
      return { ...state, toLanguage: action.payload, loading }
    case 'SET_FROM_TEXT':
      return {
        ...state,
        fromText: action.payload,
        loading: true,
      }
    case 'SET_TRANSLATION':
      return { ...state, translation: action.payload, loading: false }
    default:
      return state
  }
}
