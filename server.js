const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

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
app.post('/api/proposal-response', (req, res) => {
  const { answer } = req.body;
  console.log(`Proposal answer received: ${answer}`);
  res.json({ success: true, message: answer === 'yes' ? 'She said YES! 💍' : 'Keep trying...' });
});

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`💕 Proposal website running at http://localhost:${PORT}`);
});
