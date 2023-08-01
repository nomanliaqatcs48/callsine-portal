import { useAuth } from "../../contexts/auth";
import { useDispatch } from "react-redux";
import { setPlaybookData } from "../../store/playbooks/actions";
import { getTeamPlaybooks } from "../../services/playbooks.service";

export const useReloadPlaybooks = () => {
  const dispatch = useDispatch();
  const auth: any = useAuth();

  const fetchPlaybooks = async () => {
    const newPlaybooks = await getTeamPlaybooks(auth["team"]);
    dispatch(setPlaybookData(newPlaybooks.data?.results));
  };

  return fetchPlaybooks;
};
