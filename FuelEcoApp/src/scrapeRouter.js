// server.js

const express = require('express');
const router = express.Router();
const scrape = require('./scraping.js');

router.post('/scrape', async (req, res) => {
  const { city } = req.body;
  
  if (!city) {
    return res.status(400).json({ error: 'City parametresi eksik.' });
  }

  try {
    const jsonData = await scrape(city);

    if (jsonData) {
      res.json(jsonData);
    } else {
      res.status(500).json({ error: 'Scraping sırasında bir hata oluştu veya veri bulunamadı.' });
    }
  } catch (error) {
    console.error('Hata oluştu:', error);
    res.status(500).json({ error: 'Beklenmeyen bir hata oluştu.' });
  }
});

module.exports = router;
