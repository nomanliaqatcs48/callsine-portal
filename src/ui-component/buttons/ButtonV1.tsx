import React from "react";
import { Button } from "@mui/material";

type ButtonV1Types = {
  variant: "white" | "transparent";
  addClassname?: string;
  children?: any;
  [x: string]: any;
};

const ButtonV1 = ({
  variant,
  addClassname,
  children,
  ...props
}: ButtonV1Types) => {
  let _variant =
    "tw-bg-white tw-text-[#1976D2] tw-border tw-border-solid tw-border-white hover:tw-bg-[#f2f2f2] hover:tw-text-[#1976D2]";

  if (variant === "transparent") {
    _variant =
      "tw-bg-transparent tw-text-white tw-border tw-border-solid tw-border-white hover:tw-bg-white hover:tw-text-[#1976D2]";
  }

  return (
    <>
      <Button
        className={`tw-text-[18px] tw-font-normal tw-normal-case tw-px-[26px] tw-py-[16.5px] tw-rounded-[5px] tw-leading-[38px] tw-transition-all ${_variant} lg:tw-text-[25px] ${addClassname}`}
        size="large"
        {...props}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonV1;
