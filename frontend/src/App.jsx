import { useEffect, useState } from 'react'
import './App.css'
import { messages, sttLang } from './i18n'
import Dashboard from './components/Dashboard'

const apiBase = 'http://localhost:3001'

function App() {
  const [recording, setRecording] = useState(false)
  const [health, setHealth] = useState('')
  const [intent, setIntent] = useState(null)
  const [spend, setSpend] = useState(null)
  const [ttsAudio, setTtsAudio] = useState('')
  const [error, setError] = useState('')
  const [lang, setLang] = useState('en')

  useEffect(() => {
    fetch(`${apiBase}/health`).then(r => r.json()).then(setHealth).catch(() => setHealth(''))
  }, [])

  const testIntent = async () => {
    setError('')
    try {
      const res = await fetch(`${apiBase}/api/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })
      const data = await res.json()
      setIntent(data)
    } catch (e) {
      setError(messages[lang].errorIntent)
    }
  }

  const testSpend = async () => {
    setError('')
    try {
      const res = await fetch(`${apiBase}/api/spend?category=dining&from=2025-11-01&to=2025-11-30`)
      const data = await res.json()
      setSpend(data)
    } catch (e) {
      setError(messages[lang].errorSpend)
    }
  }

  const testTTS = async () => {
    setError('')
    try {
      const res = await fetch(`${apiBase}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })
      const data = await res.json()
      setTtsAudio(data.audioBase64 || '')
    } catch (e) {
      setError(messages[lang].errorTts)
    }
  }

  const [inputText, setInputText] = useState('How much did I spend on dining this month?')
  const toggleMic = async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setError(messages[lang].errorSttUnavailable); return }
    if (!recording) {
      const rec = new SR()
      rec.lang = sttLang[lang]
      rec.continuous = false
      rec.interimResults = false
      rec.onresult = e => { const t = e.results[0][0].transcript; setInputText(t) }
      rec.onerror = () => setError(messages[lang].errorStt)
      rec.onend = () => setRecording(false)
      rec.start()
      setRecording(true)
    } else {
      setRecording(false)
    }
  }

  return (
    <div className="container">
      <h1>{messages[lang].title}</h1>
      <div className="status">{messages[lang].backendStatus}: {typeof health === 'object' ? health.status : 'offline'}</div>
      <div className="controls">
        <button onClick={toggleMic}>{recording ? messages[lang].micStop : messages[lang].micStart}</button>
        <input value={inputText} onChange={e => setInputText(e.target.value)} className="input" placeholder={messages[lang].inputPlaceholder} />
        <button onClick={testIntent}>{messages[lang].testIntent}</button>
        <button onClick={testSpend}>{messages[lang].testSpend}</button>
        <button onClick={testTTS}>{messages[lang].testTTS}</button>
        <label>{messages[lang].language}: </label>
        <select value={lang} onChange={e => setLang(e.target.value)}>
          <option value="en">{messages[lang].english}</option>
          <option value="es">{messages[lang].spanish}</option>
        </select>
      </div>
      {intent && <pre className="panel">{JSON.stringify(intent, null, 2)}</pre>}
      {spend && <pre className="panel">{JSON.stringify(spend, null, 2)}</pre>}
      {ttsAudio && <audio controls src={`data:audio/mpeg;base64,${ttsAudio}`} />}
      {error && <div className="error">{error}</div>}
      <Dashboard />
    </div>
  )
}

export default App
