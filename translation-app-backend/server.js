const express = require('express');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/audio', express.static(path.join(__dirname, 'audio')));


const projectId = 'transoplanet-backend';
const keyFilename = 'transoplanet-backend-api.json';

app.post('/api/translate', async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
  
      const translate = new Translate({ projectId, keyFilename });
      const [translation] = await translate.translate(text, targetLanguage);
      const translatedText = translation;
  
      const client = new TextToSpeechClient({ projectId, keyFilename });
      const request = {
        input: { text: translatedText },
        voice: { languageCode: targetLanguage, ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      };
  
      const [response] = await client.synthesizeSpeech(request);
      const outputFile = `./audio/output_${Date.now()}.mp3`;
  
      fs.writeFile(outputFile, response.audioContent, 'binary', (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Text-to-speech conversion failed' });
        } else {
          res.json({translatedText, audioFile: outputFile });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Translation failed' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
