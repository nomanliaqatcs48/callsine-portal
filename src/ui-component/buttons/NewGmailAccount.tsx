import React from "react";
import { Button } from "@mui/material";
import config from "../../config";
import { useAuth } from "../../contexts/auth";

type NewGmailAccountTypes = {
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

const NewGmailAccount = ({
  buttonText,
  style,
  email,
  size = "large",
  color,
}: NewGmailAccountTypes) => {
  const { profile }: any = useAuth();

  const handleClick = () => {
    alert(JSON.stringify(profile));
    return;
    window.location.href = `${config.service.BASE_URL}/api/gmail/?login_hint=${email}&user_id=1=${profile?.id}/`;
  };

  return (
    <>
      <Button
        disableElevation
        size={size}
        type="button"
        variant="contained"
        color={color}
        onClick={handleClick}
        style={style}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default NewGmailAccount;
