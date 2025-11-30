const express = require('express');
const cors = require('cors');
const cfg = require('./config');
const { analyzeText } = require('./services/gemini');

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

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server listening on ${url}`);
  console.log(`Preview URL: ${url}`);
});
