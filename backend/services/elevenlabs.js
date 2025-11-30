const fetch = require('node-fetch')

async function tts(apiKey, voiceId, text, modelId) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`
  const body = { text, model_id: modelId }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    return { error: 'elevenlabs_error', status: res.status }
  }
  const buf = await res.buffer()
  return { audioBase64: buf.toString('base64') }
}

async function stt(apiKey, audioBase64) {
  return { text: 'transcripción no configurada' }
}

module.exports = { tts, stt }
