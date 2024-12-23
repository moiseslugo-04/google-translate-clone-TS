import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { FromLanguage, Language, SectionTypes } from '../types.d'
import { FC } from 'react'
type Props =
  | {
      type: SectionTypes.From
      value: FromLanguage
      onChange: (language: FromLanguage) => void
    }
  | {
      type: SectionTypes.To
      value: Language
      onChange: (language: Language) => void
    }
export const Select: FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value
    onChange(language as Language)
  }
  return (
    <Form.Select
      aria-label='Select your Language'
      value={value}
      onChange={handleChange}
    >
      {type === SectionTypes.From && (
        <option value={AUTO_LANGUAGE}>Detect Language</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => {
        return (
          <option key={key} value={key}>
            {value}
          </option>
        )
      })}
    </Form.Select>
  )
}
