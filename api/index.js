import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({
    "message": "Welcome to v1 of the PiperChat API",
  });
});

app.post('/query', async (req, res) => {
  const { messages } = req.body;
  let newMessages = [];

  for (let i=0; i<messages.length; i++) {
    if (i % 2 === 0) {
      newMessages.push({ role: "user", content: messages[i] });
    } else {
      newMessages.push({ role: "assistant", content: messages[i] });
    }
  }

  const chat_completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: newMessages,
  });

  res.send({
    response: chat_completion.data.choices[0].message.content,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
