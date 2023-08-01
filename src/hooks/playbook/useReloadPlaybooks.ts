import { useAuth } from "../../contexts/auth";
import { useDispatch } from "react-redux";
import { setPlaybookData } from "../../store/playbooks/actions";
import { getTeamPlaybooks } from "../../services/playbooks.service";

import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";

export const useReloadPlaybooks = () => {
  const dispatch = useDispatch();
  const auth: any = useAuth();

  const fetchPlaybooks = async () => {
    insertBodyLoader();
    const newPlaybooks = await getTeamPlaybooks(auth["team"]);
    dispatch(setPlaybookData(newPlaybooks.data?.results));
    removeBodyLoader();
  };

  return fetchPlaybooks;
};
