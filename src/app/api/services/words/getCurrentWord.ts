import { requestGraphQl } from "../hygraph";

import { getCurrentWordSchema } from "./validators/getCurrentWord";

export const getCurrentWord = async () => {
  const query = `
    query Words {
      words(where: { isCurrent: true }) {
        id
        value
      }
    }
  `;

  const response = await requestGraphQl(query);
  const {data: { words }} = getCurrentWordSchema.parse(response)

  const word = words[0]

  return word
};