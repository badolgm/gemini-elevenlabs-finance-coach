const express = require('express');
const cors = require('cors');
const cfg = require('./config');
const { analyzeText } = require('./services/gemini');
const { tts, stt } = require('./services/elevenlabs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = cfg.port;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cfa-backend' });
});

// Stub endpoints (alineados al MASTERDOC)
app.post('/api/intent', async (req, res) => {
  const { text } = req.body || {};
  if (!cfg.geminiKey) {
    return res.status(501).json({ error: 'Gemini API key not configured', input: text });
  }
  try {
    const result = await analyzeText(cfg.geminiKey, text || '')
    return res.json(result)
  } catch (e) {
    return res.status(500).json({ error: 'Gemini call failed' })
  }
});

app.get('/api/spend', (req, res) => {
  const { category = 'dining', from = '2025-11-01', to = '2025-11-30' } = req.query;
  res.json({ category, from, to, total: 123.45 });
});

app.post('/api/budget', (req, res) => {
  const { category, monthlyLimit } = req.body || {};
  res.json({ ok: true, category, monthlyLimit });
});

app.post('/api/transaction', (req, res) => {
  const { amount, category, date, note } = req.body || {};
  res.json({ ok: true, id: 'tx_demo', amount, category, date, note });
});

app.get('/api/advice', (req, res) => {
  res.json({ advice: 'Consider reducing dining expenses this week to stay within budget.' });
});

app.post('/api/tts', async (req, res) => {
  const { text, voiceId } = req.body || {}
  if (!cfg.elevenKey) {
    return res.status(501).json({ error: 'ElevenLabs API key not configured' })
  }
  const vId = voiceId || cfg.elevenVoiceId
  if (!vId) {
    return res.status(400).json({ error: 'voiceId required' })
  }
  try {
    const r = await tts(cfg.elevenKey, vId, text || '', cfg.elevenModelId)
    return res.json(r)
  } catch (e) {
    return res.status(500).json({ error: 'TTS failed' })
  }
})

app.post('/api/stt', async (req, res) => {
  const { audioBase64 } = req.body || {}
  if (!cfg.elevenKey) {
    return res.status(501).json({ error: 'ElevenLabs API key not configured' })
  }
  try {
    const r = await stt(cfg.elevenKey, audioBase64 || '')
    return res.json(r)
  } catch (e) {
    return res.status(500).json({ error: 'STT failed' })
  }
})

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server listening on ${url}`);
  console.log(`Preview URL: ${url}`);
});
