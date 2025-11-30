const fetch = require('node-fetch')

async function analyzeText(apiKey, text) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey
  const prompt = `Clasifica la intención financiera y devuelve JSON con {intent, entities:{category,period,amount,date}}. Texto: "${text}"`
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    return { error: 'gemini_error', status: res.status }
  }
  const data = await res.json()
  const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
  let parsed
  try { parsed = JSON.parse(txt) } catch { parsed = { intent: 'unknown', raw: txt } }
  return parsed
}

module.exports = { analyzeText }
