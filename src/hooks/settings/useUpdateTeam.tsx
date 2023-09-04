import { useState } from "react";
import { updateTeamMeService } from "src/services/profile.service";

const useUpdateTeam = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);

  const updateTeam = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateTeamMeService(data);
      setResponse(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, updateTeam };
};

export default useUpdateTeam;
