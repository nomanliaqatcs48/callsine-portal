import http from "./axios";
import { endpoints } from "./endpoints";

export const getPromptsService = async () => {
  return await http.get(`${endpoints.PROMPTS}`);
};

export const getPromptResponsesFromPersonService = async (id: number) => {
  return await http.get(`${endpoints.PROMPT_RESPONSES}/?person=${id}`);
};

export const createResponsesService = async (
  prompt: number,
  person: number,
  context: any
) => {
  return await http.post(`${endpoints.PROMPT_RESPONSES}`, {
    prompt: prompt,
    person: person,
    context: context,
  });
};

export const generateResponsesService = async (prompt: number) => {
  return await http.post(`${endpoints.PROMPT_RESPONSES}${prompt}/generate/`);
};
