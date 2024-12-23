import { Action, FromLanguage, Language } from '../../types.d'
export function createActions(dispatch: React.Dispatch<Action>) {
  return {
    interChangeLang: () => {
      dispatch({ type: 'INTERCHANGE_LANGUAGES' })
    },
    setFromLang: (language: FromLanguage) => {
      dispatch({ type: 'SET_FROM_LANGUAGE', payload: language })
    },
    setToLang: (language: Language) => {
      dispatch({ type: 'SET_TO_LANGUAGE', payload: language })
    },
    setFromText: (text: string) => {
      dispatch({ type: 'SET_FROM_TEXT', payload: text })
    },
    setTranslation: (translation: string) => {
      dispatch({ type: 'SET_TRANSLATION', payload: translation })
    },
  }
}
