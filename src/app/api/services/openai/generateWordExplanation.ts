import { Configuration, OpenAIApi } from 'openai';
import { AxiosError } from 'axios';

import { parsedEnvs } from '@/shared/helpers/parseEnvs';

const configuration = new Configuration({
  apiKey: parsedEnvs.OPENAI_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

export const generateWordExplanation = async (value: string) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      top_p: 1.0,
      messages: [
        {
          role: 'system',
          content: 'Você precisa se comportar como um sistema que responda perguntas relacionada a programação',
        },
        {
          role: 'user',
          content: value,
        }],
    });

    return chatCompletion.data.choices;
  } catch (error) {
    const errorAxios = error as AxiosError;
    console.error(errorAxios.response);
  }
};
