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
export const getPlaybooks = async (filters: any, searchValue: string = "") => {
  return await http.get(
    `${endpoints.PLAYBOOKS}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
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

export const setPlaybook = async (
  playbookId: number,
  personId: number,
  context: any
) => {
  return await http.post(`/api/persons/${personId}/set_playbook/`, {
    playbook_id: playbookId,
    context: context,
  });
};

export const setPlaybookV2Service = async (
  playbookId: number,
  personId: number,
  context: any,
  is_overwrite: boolean = false
) => {
  return await http.post(`/api/persons/${personId}/set_playbook_v2/`, {
    playbook_id: playbookId,
    context: context,
    is_overwrite: is_overwrite,
  });
};

export const generateResponsesService = async (sequenceEventId: number) => {
  return await http.post(
    `${endpoints.SEQUENCE_EVENTS}${sequenceEventId}/generate/`
  );
  /*return await http.post(
    `${endpoints.PROMPT_RESPONSES}${promptId}/generate/?person=${personId}`
  );*/
};

export const bulkGenerateService = async (
  personList: any[],
  playbook_id: number
) => {
  return await http.post(`/api/persons/bulk_generate/`, {
    personList: personList,
    playbook_id: playbook_id,
  });
};
