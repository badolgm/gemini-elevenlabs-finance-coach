require('dotenv').config()

const cfg = {
  port: process.env.PORT || 3001,
  geminiKey: process.env.GEMINI_API_KEY || '',
  elevenKey: process.env.ELEVENLABS_API_KEY || '',
  elevenVoiceId: process.env.ELEVENLABS_VOICE_ID || '',
  elevenModelId: process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2'
}

module.exports = cfg
