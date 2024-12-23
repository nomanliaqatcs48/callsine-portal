import { Button } from "@mui/material";
import React from "react";
import config from "../../config";
import { useAuth } from "../../contexts/auth";

type NewOutlookAccountTypes = {
  buttonText: string;
  style?: React.CSSProperties | undefined;
  email?: string | null;
  size?: "large" | "small" | "medium" | undefined;
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
};

const NewOutlookAccount = ({
  buttonText,
  style,
  email,
  size,
  color,
}: NewOutlookAccountTypes) => {
  const { auth } = useAuth();

  const handleClick = () => {
    window.location.href = `${config.service.BASE_URL}/api/outlook/?login_hint=${email}&user_id=${auth?.id}`;
  };

  return (
    <>
      <Button
        disableElevation
        size={size}
        type="button"
        variant="outlined"
        color={color}
        onClick={handleClick}
        style={style}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default NewOutlookAccount;
