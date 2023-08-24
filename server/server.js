import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai'
import axios from 'axios';
dotenv.config()

const openai = new OpenAI({
    apiKey: "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",
});

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Codility!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role":"user","content":`${prompt}`}],
        temperature: 0,
        max_tokens: 1024,
      });
      

    res.status(200).send({
      bot: response["choices"].message
    });
    console.log(response["choices"].message);

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))