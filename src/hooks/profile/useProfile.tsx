import { useEffect, useState } from "react";

export const useProfile = () => {
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>({
    form: false,
  });

  useEffect(() => {}, []);

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword1 = (event: any) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event: any) => {
    event.preventDefault();
  };

  return {
    showPassword1,
    setShowPassword1,
    showPassword2,
    setShowPassword2,
    strength,
    setStrength,
    level,
    setLevel,
    isLoading,
    setIsLoading,
    handleClickShowPassword1,
    handleClickShowPassword2,
    handleMouseDownPassword1,
    handleMouseDownPassword2,
  };
};
