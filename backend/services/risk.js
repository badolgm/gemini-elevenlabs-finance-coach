const { generateJson } = require('./gemini')

async function analyzeRisk(apiKey, features) {
  const f = features || {}
  const prompt = `Eres un analista financiero. Devuelve JSON como {risk_score:0-100, categories:[{name,level}], recommendations:[string]} basado en: ${JSON.stringify(f)}`
  return await generateJson(apiKey, prompt)
}

module.exports = { analyzeRisk }
