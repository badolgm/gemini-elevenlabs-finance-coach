const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cfa-backend' });
});

// Stub endpoints (alineados al MASTERDOC)
app.post('/api/intent', (req, res) => {
  const { text } = req.body || {};
  res.json({ intent: 'query_spend', entities: { category: 'dining', period: 'month' }, input: text });
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

