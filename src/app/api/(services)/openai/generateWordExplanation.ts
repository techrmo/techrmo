import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

import { privateEnvs } from '@/shared/config/envs';

const configuration = new Configuration({
  apiKey: privateEnvs.OPENAI_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

export const generateWordExplanation = async (value: string) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-4',

      top_p: 1.0,
      messages: [
        {
          role: 'system',
          content:
            'Você precisa se comportar como um sistema que responda perguntas relacionada a programação',
        },
        {
          role: 'user',
          content:
            'Me traga 100 palavras relacionadas a programação que conteham exatamente 5 caracteres e junto me traz a explicação curta de cada uma delas.',
        },
      ],
    });

    return chatCompletion.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response);
    }

    return null;
  }
};
