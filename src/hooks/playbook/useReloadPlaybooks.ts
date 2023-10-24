import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/auth";
import { getTeamPlaybooks } from "../../services/playbooks.service";
import { setPlaybookData } from "../../store/playbooks/actions";

export const useReloadPlaybooks = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();

  const fetchPlaybooks = async () => {
    const newPlaybooks = await getTeamPlaybooks(auth["team"], "", "");
    dispatch(setPlaybookData(newPlaybooks.data?.results));
  };

  return fetchPlaybooks;
};
