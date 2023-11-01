import { useEffect, useState } from "react";
import { getUsersMeService } from "src/services/profile.service";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  user_city: string;
  user_state: string;
  user_title: string;
  role: string;
};

const useGetUserMe = (): {
  loading: boolean;
  data: User | null;
  error: Error | null;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      setLoading(true);
      try {
        const result = await getUsersMeService();
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

export default useGetUserMe;
