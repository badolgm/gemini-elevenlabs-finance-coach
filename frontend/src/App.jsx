import { useEffect, useState } from 'react'
import './App.css'

const apiBase = 'http://localhost:3001'

function App() {
  const [recording, setRecording] = useState(false)
  const [health, setHealth] = useState('')
  const [intent, setIntent] = useState(null)
  const [spend, setSpend] = useState(null)
  const [ttsAudio, setTtsAudio] = useState('')
  const [error, setError] = useState('')

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
      setError('No se pudo consultar intención')
    }
  }

  const testSpend = async () => {
    setError('')
    try {
      const res = await fetch(`${apiBase}/api/spend?category=dining&from=2025-11-01&to=2025-11-30`)
      const data = await res.json()
      setSpend(data)
    } catch (e) {
      setError('No se pudo consultar gasto')
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
      setError('No se pudo convertir a audio')
    }
  }

  const [inputText, setInputText] = useState('Cuánto gasté en dining este mes')
  const toggleMic = async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setError('STT no disponible en este navegador'); return }
    if (!recording) {
      const rec = new SR()
      rec.lang = 'es-ES'
      rec.continuous = false
      rec.interimResults = false
      rec.onresult = e => { const t = e.results[0][0].transcript; setInputText(t) }
      rec.onerror = () => setError('Error en STT local')
      rec.onend = () => setRecording(false)
      rec.start()
      setRecording(true)
    } else {
      setRecording(false)
    }
  }

  return (
    <div className="container">
      <h1>Conversational Financial Assistant</h1>
      <div className="status">Backend: {typeof health === 'object' ? health.status : 'offline'}</div>
      <div className="controls">
        <button onClick={toggleMic}>{recording ? 'Detener' : 'Micrófono'}</button>
        <input value={inputText} onChange={e => setInputText(e.target.value)} className="input" />
        <button onClick={testIntent}>Probar Intención</button>
        <button onClick={testSpend}>Probar Gasto</button>
        <button onClick={testTTS}>Probar TTS</button>
      </div>
      {intent && <pre className="panel">{JSON.stringify(intent, null, 2)}</pre>}
      {spend && <pre className="panel">{JSON.stringify(spend, null, 2)}</pre>}
      {ttsAudio && <audio controls src={`data:audio/mpeg;base64,${ttsAudio}`} />}
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default App
