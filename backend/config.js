require('dotenv').config()

const cfg = {
  port: process.env.PORT || 3001,
  geminiKey: process.env.GEMINI_API_KEY || '',
  elevenKey: process.env.ELEVENLABS_API_KEY || ''
}

module.exports = cfg
