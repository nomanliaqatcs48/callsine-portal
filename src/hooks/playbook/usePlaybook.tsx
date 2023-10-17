import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncDebounce } from "react-table";
import { useAuth } from "../../contexts/auth";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { devLog, devLogError } from "../../helpers/logs";
import { getTeamPlaybooks } from "../../services/playbooks.service";
import { setPlaybookData } from "../../store/playbooks/actions";
import { loadString } from "../../utils/storage";

export const usePlaybook = (
  load: boolean = true,
  filtersParam: any = {
    limit: 15,
    offset: 0,
  }
) => {
  const auth: any = useAuth();
  const dispatch = useDispatch();
  const [playbookDataFromState, setPlaybookDataFromState] = useState<any[]>([]);
  const [promptList, setPromptList] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>(filtersParam);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortedId, setSortedId] = useState<string>("");
  const [isOrderDesc, setIsOrderDesc] = useState<any>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    table: false,
    search: false,
  });

  const getToken = async () => {
    let _token = await loadString("token");
    devLog(async () => {
      console.log("_token", _token);
      console.log("refresh_token", await loadString("refresh"));
    });
  };
  useEffect(() => {
    if (load) {
      getAllPlaybook();
      getToken();
    }
  }, [load, filters, sortedId, isOrderDesc]);

  const getAllPlaybook = async () => {
    insertBodyLoader();

    try {
      // let res = await dummyData();]

      let res = await getTeamPlaybooks(auth["team"], filters, searchValue);
      if (res?.data) {
        devLog(() => {
          console.log("res.data", res.data);
        });
        setTotal(res.data?.count);
        setPlaybookDataFromState(res.data?.results);

        if (playbookDataFromState) {
          dispatch(setPlaybookData(res.data?.results));
        }
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
        removeBodyLoader();
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      removeBodyLoader();
    }
  };

  const handleSearchOnChange = useAsyncDebounce(async () => {
    getAllPlaybook();
  }, 1000);

  const handleSearchOnBeforeChange = (e: any) => {
    setIsLoading((prev: any) => ({ ...prev, search: true }));
    setSearchValue(e.target.value);
    void handleSearchOnChange();
  };

  return {
    playbookDataFromState,
    setPlaybookDataFromState,
    filters,
    setFilters,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
    selectedIndex,
    setSelectedIndex,
    selectedData,
    setSelectedData,
    isLoading,
    setIsLoading,
    getAllPlaybook,
    handleSearchOnChange,
    handleSearchOnBeforeChange,
    promptList,
    setPromptList,
  };
};
