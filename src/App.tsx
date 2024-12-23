import { Button } from 'react-bootstrap'
import './App.css'
import { useTranslate } from './hooks/useTranslate/useTranslate'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/incons'
import { Select } from './components/Select'
import { SectionTypes } from './types.d'
import { TextArea } from './components/TextArea'
import { useDebounce } from './hooks/useDebounce/useDebounce'
import { useEffect } from 'react'
import { translate } from './services/api'
import { VOICE_LANGUAGE } from './constants'

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    translation,
    loading,
    setFromLang,
    setToLang,
    setFromText,
    interChangeLang,
    setTranslation,
  } = useTranslate()
  const debouncedFromText = useDebounce(fromText, 300)
  useEffect(() => {
    if (debouncedFromText === '') return
    translate({ text: debouncedFromText, fromLanguage, toLanguage })
      .then((translation) => {
        if (translation == null) return
        setTranslation(translation)
      })
      .catch(() => {
        setTranslation('Error')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translation)
    //set up
    console.log(VOICE_LANGUAGE[toLanguage])
    utterance.lang = VOICE_LANGUAGE[toLanguage]
    utterance.rate = 1

    speechSynthesis.speak(utterance)
  }
  const handleClipboard = () => {
    navigator.clipboard.writeText(translation)
  }
  return (
    <>
      <h2>Google Translation Clone</h2>
      <div className='translate'>
        <div className='col'>
          <div className='div'>
            <Select
              type={SectionTypes.From}
              value={fromLanguage}
              onChange={setFromLang}
            />
            <TextArea
              type={SectionTypes.From}
              value={fromText}
              onChange={setFromText}
            />
          </div>
        </div>

        <div className='col'>
          <Button onClick={interChangeLang}>
            <ArrowsIcon />
          </Button>
        </div>

        <div className='col'>
          <div className='div'>
            <Select
              type={SectionTypes.To}
              value={toLanguage}
              onChange={setToLang}
            />
            <TextArea
              type={SectionTypes.To}
              value={translation}
              onChange={setTranslation}
              loading={loading}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                display: 'flex',
              }}
            >
              <span onClick={handleClipboard}>
                <ClipboardIcon />
              </span>
              <span onClick={handleSpeak}>
                <SpeakerIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
