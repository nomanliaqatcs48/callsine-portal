import { useEffect, useState } from "react";
import { getTeamMeService } from "src/services/profile.service";

type Team = {
  domain: string;
  name: string;
  company_city: string;
  company_state: string;
  company_value_prop: string;
};

const useGetTeamMe = (): {
  loading: boolean;
  data: Team | null;
  error: Error | null;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Team | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      setLoading(true);
      try {
        const result = await getTeamMeService();
        setData(result.data?.results && result.data?.results[0]);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { loading, data, error };
};

export default useGetTeamMe;
