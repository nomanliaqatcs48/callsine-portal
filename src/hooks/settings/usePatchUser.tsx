import { useState } from "react";
import { patchUsersMeService } from "src/services/profile.service";

type ServiceResponse = {
  data?: any;
  error?: any;
};

const usePatchUsersMe = () => {
  const [response, setResponse] = useState<ServiceResponse>({});
  const [loading, setLoading] = useState<boolean>(false);

  const patchData = async (data: any) => {
    setLoading(true);
    try {
      const result = await patchUsersMeService(data);
      setResponse({ data: result });
    } catch (error) {
      setResponse({ error });
    } finally {
      setLoading(false);
    }
  };

  return { patchData, response, loading };
};

export default usePatchUsersMe;
