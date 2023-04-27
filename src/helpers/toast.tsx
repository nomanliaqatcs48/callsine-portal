import { toast } from "react-toastify";

export const Toast = () => {
  const success = (str: string) => {
    return toast.success(str, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return {
    success,
  };
};
