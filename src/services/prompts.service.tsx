import http from "./axios";
import { endpoints } from "./endpoints";

export const getPromptsService = async (
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.PROMPTS}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};

export const getPromptResponsesFromPersonService = async (personId: number) => {
  return await http.get(`${endpoints.PROMPT_RESPONSES}?person=${personId}`);
};

export const createResponsesService = async (
  promptId: number,
  personId: number,
  context: any
) => {
  return await http.post(`${endpoints.PROMPT_RESPONSES}`, {
    prompt: promptId,
    person: personId,
    context: context,
  });
};

export const generateResponsesService = async (
  promptId: number,
  personId: number
) => {
  return await http.post(
    `${endpoints.PROMPT_RESPONSES}${promptId}/generate/?person=${personId}`
  );
};
