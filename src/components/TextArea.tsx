import { Form } from 'react-bootstrap'
import { SectionTypes } from '../types.d'
interface Props {
  type: SectionTypes
  value: string
  loading?: boolean
  onChange: (text: string) => void
}
function getPlaceholder({
  type,
  loading,
}: {
  type: SectionTypes
  loading?: boolean
}) {
  if (type === SectionTypes.From) return 'Enter your text'
  if (loading === true) return 'translating'
  return 'Translate'
}
const commonStyles = { border: 0, height: '200px' }
export function TextArea({ type, value, onChange, loading }: Props) {
  const styles =
    type === SectionTypes.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value
    onChange(text)
  }
  return (
    <Form.Control
      as='textarea'
      type={type}
      value={value}
      placeholder={getPlaceholder({ type, loading })}
      disabled={type === SectionTypes.To}
      onChange={handleChange}
      style={styles}
      autoFocus={type === SectionTypes.From}
    ></Form.Control>
  )
}
