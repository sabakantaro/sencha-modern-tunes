const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Proxy route
app.get('/proxy/*', async (req, res) => {
  const targetURL = req.params[0];
  try {
    const response = await axios.get(targetURL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error during proxy request.');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
