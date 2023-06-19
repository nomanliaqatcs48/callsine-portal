export const devLog = (callback: any) => {
  if (process.env.NODE_ENV === "development") {
    callback();
  }
};

export const devLogError = (callback: any) => {
  if (process.env.NODE_ENV === "development") {
    console.group("error");
    callback();
    console.groupEnd();
  }
};
