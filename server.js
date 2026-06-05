const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// ── TELEGRAM CONFIG ──
const TELEGRAM_BOT_TOKEN = '8600162799:AAHSUKrnZNYSJ0K23Bg2rfZxOyZx7QvBqKs';
const TELEGRAM_CHAT_ID  = '6565538724';

async function sendTelegramNotification() {
  try {
    const fetch = (await import('node-fetch')).default;
    const msg = encodeURIComponent('💍 SHE SAID YES! 🎉\n\nJuhi clicked Yes on your proposal! Go celebrate! 💕');
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${msg}`);
    console.log('✅ Telegram notification sent!');
  } catch (e) {
    console.error('Telegram error:', e.message);
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Relationship start date API
app.get('/api/relationship', (req, res) => {
  res.json({
    startDate: '2024-10-29T00:00:00Z',
    partnerName: 'My Love'
  });
});

// Handle proposal response
app.post('/api/proposal-response', async (req, res) => {
  const { answer } = req.body;
  console.log(`Proposal answer received: ${answer}`);
  if (answer === 'yes') {
    await sendTelegramNotification();
  }
  res.json({ success: true, message: answer === 'yes' ? 'She said YES! 💍' : 'Keep trying...' });
});

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`💕 Proposal website running at http://localhost:${PORT}`);
});
