
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); //parses JSON bodies

// returns the budget.json we have in public folder as JSON after getting it
app.get('/budget', (req, res) => {
  const file = path.join(__dirname, '..', 'public', 'budget.json');
  fs.readFile(file, 'utf8', (err, text) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not read budget.json' });
    }
    res.json(JSON.parse(text));
  });
});
//here we are setting up the server to listen on port 4000 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
